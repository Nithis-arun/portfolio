import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Custom cursor with dot + ring following effect.
 * Hides on touch devices automatically.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef<number>(0);

  const animate = useCallback(() => {
    ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
    ring.current.y += (mouse.current.y - ring.current.y) * 0.15;

    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`;
    }
    if (ringRef.current) {
      ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) scale(${hovering ? 1.5 : 1})`;
    }
    raf.current = requestAnimationFrame(animate);
  }, [hovering]);

  useEffect(() => {
    // Don't show on touch devices
    if ("ontouchstart" in window) return;

    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };

    const onEnter = () => setVisible(true);
    const onLeave = () => setVisible(false);

    // Detect hoverable elements
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a, button, [role='button'], input, textarea, select, [data-cursor-hover]")
      ) {
        setHovering(true);
      }
    };
    const onOut = () => setHovering(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    raf.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf.current);
    };
  }, [animate, visible]);

  if ("ontouchstart" in (typeof window !== "undefined" ? window : {})) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none transition-opacity duration-200"
        style={{
          width: 6,
          height: 6,
          marginLeft: -3,
          marginTop: -3,
          borderRadius: "50%",
          backgroundColor: "var(--accent-violet)",
          opacity: visible ? 1 : 0,
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9997] pointer-events-none transition-opacity duration-200"
        style={{
          width: 36,
          height: 36,
          marginLeft: -18,
          marginTop: -18,
          borderRadius: "50%",
          border: "1.5px solid rgba(139,92,246,0.4)",
          opacity: visible ? 1 : 0,
          transition: "transform 0.08s ease-out, opacity 0.2s",
        }}
      />
    </>
  );
}
