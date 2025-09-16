import { useEffect, useState } from "react";

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const doc = document.documentElement;
      const height = doc.scrollHeight - window.innerHeight;
      const p = height > 0 ? Math.min(1, Math.max(0, scrollTop / height)) : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-50 h-0.5">
      <div
        className="h-full origin-left bg-gradient-to-r from-primary via-fuchsia-500 to-purple-500 transition-transform"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden
      />
    </div>
  );
}
