import { useRef, useState, type ReactNode } from "react";

/**
 * Wraps any element to create a magnetic hover effect.
 * The child subtly moves toward the cursor when hovering.
 */
export default function MagneticWrapper({
  children,
  strength = 0.3,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    setPos({ x: dx, y: dy });
  };

  const handleLeave = () => setPos({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `translate(${pos.x}px, ${pos.y}px)`,
        transition: "transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}
