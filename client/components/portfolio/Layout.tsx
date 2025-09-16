import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ScrollProgress from "./ScrollProgress";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh flex flex-col">
      <ScrollProgress />
      <Header />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}
