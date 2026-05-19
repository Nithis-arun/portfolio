import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, Send, User, Loader2 } from "lucide-react";
import GlassCard from "@/components/shared/GlassCard";
import { cn } from "@/lib/utils";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm Nithis's AI Assistant. Ask me anything about his skills, projects, or experience!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput("");
    
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          history: messages.slice(1), // Exclude the initial greeting if desired, or include it
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        if (errorData) {
          throw new Error(errorData.reply || errorData.details || errorData.error || "Failed to get response");
        }
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (error: any) {
      console.error("Chat Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: error.message || "Sorry, I am currently experiencing a system glitch. Please try again later." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Utility to parse basic markdown-like bold/list in the response
  const formatText = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('* ') || line.startsWith('- ')) {
        return <li key={i} className="ml-4 list-disc">{line.substring(2)}</li>;
      }
      // Extremely basic bold parsing (**text**)
      const parts = line.split(/\\*\\*(.*?)\\*\\*/g);
      return (
        <p key={i} className="mb-2 last:mb-0">
          {parts.map((part, index) => 
            index % 2 === 1 ? <strong key={index} className="font-semibold text-white">{part}</strong> : part
          )}
        </p>
      );
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute bottom-16 right-0 w-[340px] sm:w-[380px] h-[500px] max-h-[80vh] flex flex-col mb-4 origin-bottom-right"
          >
            <GlassCard className="h-full flex flex-col overflow-hidden holographic" glow="violet">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400">
                    <Bot size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">AI Assistant</h3>
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                      Online
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors text-muted-foreground hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Messages Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                {messages.map((msg, idx) => (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={idx}
                    className={cn(
                      "flex gap-3 max-w-[85%]",
                      msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                    )}
                  >
                    <div className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-1",
                      msg.role === "user" ? "bg-cyan-500/20 text-cyan-400" : "bg-violet-500/20 text-violet-400"
                    )}>
                      {msg.role === "user" ? <User size={12} /> : <Bot size={12} />}
                    </div>
                    <div className={cn(
                      "px-3 py-2 rounded-2xl text-xs leading-relaxed",
                      msg.role === "user" 
                        ? "bg-cyan-500/10 text-cyan-50 rounded-tr-sm border border-cyan-500/20" 
                        : "bg-white/5 text-gray-200 rounded-tl-sm border border-white/10"
                    )}>
                      {formatText(msg.content)}
                    </div>
                  </motion.div>
                ))}
                
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex gap-3 max-w-[85%] mr-auto"
                  >
                    <div className="w-6 h-6 rounded-full bg-violet-500/20 text-violet-400 flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot size={12} />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/5 border border-white/10 flex items-center gap-1">
                      <Loader2 size={14} className="animate-spin text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Thinking...</span>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-white/5 bg-white/5">
                <div className="relative flex items-center">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about my projects or skills..."
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-2 pl-3 pr-10 text-xs text-white placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-violet-500/50 resize-none h-[40px] scrollbar-none"
                    rows={1}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    className="absolute right-2 w-7 h-7 flex items-center justify-center rounded-lg bg-violet-500/20 text-violet-400 hover:bg-violet-500/40 disabled:opacity-50 disabled:hover:bg-violet-500/20 transition-colors"
                  >
                    <Send size={12} />
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(139,92,246,0.4)] hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-shadow relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="bot"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Bot size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
