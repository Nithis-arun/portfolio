import "./global.css";

import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Layout from "@/components/layout/Layout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter basename="/portfolio">
      <Routes>
        <Route path="/" element={<Layout><Index /></Layout>} />
        <Route path="*" element={<Layout><Index /></Layout>} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
