import { RequestHandler } from "express";
import { GoogleGenAI } from "@google/genai";
import { 
  PROJECTS, 
  EXPERIENCES, 
  SKILL_GROUPS, 
  CONTACT_INFO, 
  HIGHLIGHTS, 
  HERO_PHRASES 
} from "@/lib/constants";

// We will initialize the AI instance inside the handler or safely outside.
let ai: GoogleGenAI | null = null;
try {
  ai = new GoogleGenAI({});
} catch (error) {
  console.warn("Could not initialize GoogleGenAI. Is GEMINI_API_KEY set?");
}

export const handleChat: RequestHandler = async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    if (!ai) {
      res.status(503).json({ reply: "I'm currently offline because my AI module is not configured with an API key. Please contact the administrator." });
      return;
    }

    // Build the portfolio context string to feed to the AI
    const portfolioContext = `
You are an AI assistant for Nithis Arun T's developer portfolio website. 
Your goal is to answer questions about Nithis's skills, experience, projects, and background.
You must be polite, professional, concise, and helpful. You speak from the perspective of Nithis's personal AI assistant.

Here is the data about Nithis Arun T:

**Basic Info**
Role: ${HERO_PHRASES.join(", ")}
Highlights: ${HIGHLIGHTS.map(h => `${h.label}: ${h.value}`).join(" | ")}
Contact: Email: ${CONTACT_INFO.email}, Phone: ${CONTACT_INFO.phone}, Location: ${CONTACT_INFO.location}, LinkedIn: ${CONTACT_INFO.linkedin}, GitHub: ${CONTACT_INFO.github}

**Skills**
${SKILL_GROUPS.map(g => `- ${g.title}: ${g.items.join(", ")}`).join("\n")}

**Experience**
${EXPERIENCES.map(e => `- ${e.title} at ${e.company} (${e.time}):\n  ${e.bullets.join("\n  ")}`).join("\n")}

**Projects**
${PROJECTS.map(p => `- ${p.title} (${p.tag})\n  Skills: ${p.skills.join(", ")}\n  Description: ${p.desc}\n  Details:\n  ${p.bullets.join("\n  ")}`).join("\n\n")}

**Important Instructions:**
- If the user asks for contact info, provide the email and LinkedIn.
- If the user asks about the "OMS Project" (Office Management System), emphasize the new real-time communication (WebSocket, STOMP, SockJS, Kafka) and the AI Chatbot features.
- If the user asks to navigate the portfolio, guide them (sections: about, skills, experience, projects, education, contact).
- Keep your answers concise, ideally 2-4 sentences unless more detail is requested. 
- Use markdown for formatting (bolding, bullet points).
- Do not make up any information that is not present in this context. If you don't know, say you don't have that information.
`;

    const formattedHistory = (history || []).map((msg: { role: string, content: string }) => ({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    }));

    // Insert context as the system instruction or first message
    const chat = ai.chats.create({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: portfolioContext,
        temperature: 0.3,
      }
    });

    // We can't directly use history in ai.chats.create without passing it correctly or sending all previous messages.
    // So we'll format the history manually and send the latest message.
    
    // Instead of using chat session, for simple stateless API, we can just use generateContent
    // combining the history and the current message.
    
    const contents = [
      { role: "user", parts: [{ text: "System Instructions: " + portfolioContext }] },
      { role: "model", parts: [{ text: "Understood. I am Nithis Arun T's AI assistant." }] }
    ];

    for (const msg of history || []) {
      contents.push({
        role: msg.role === "assistant" ? "model" : "user",
        parts: [{ text: msg.content }]
      });
    }

    contents.push({
      role: "user",
      parts: [{ text: message }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
      config: {
        temperature: 0.3,
      }
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Chat API Error:", error);
    res.status(500).json({ 
      error: "Failed to process chat message", 
      details: error?.message || "Unknown error" 
    });
  }
};
