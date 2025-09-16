import { useEffect, useMemo, useRef, useState } from "react";

export default function Typing({
  phrases,
  typingSpeed = 60,
  backSpeed = 40,
  pause = 1200,
  className = "",
}: {
  phrases: string[];
  typingSpeed?: number;
  backSpeed?: number;
  pause?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [blink, setBlink] = useState(true);
  const mounted = useRef(true);

  const current = useMemo(() => phrases[index % phrases.length] ?? "", [phrases, index]);

  useEffect(() => {
    mounted.current = true;
    const timer = setTimeout(() => setBlink((v) => !v), 500);
    return () => {
      mounted.current = false;
      clearTimeout(timer);
    };
  }, [blink]);

  useEffect(() => {
    if (!mounted.current) return;
    if (!deleting && subIndex === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && subIndex === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((s) => s + (deleting ? -1 : 1));
    }, deleting ? backSpeed : typingSpeed);
    return () => clearTimeout(timeout);
  }, [subIndex, deleting, current, phrases.length, typingSpeed, backSpeed, pause]);

  return (
    <span className={className}>
      {current.substring(0, subIndex)}
      <span className={"ml-0.5 inline-block w-[1ch] " + (blink ? "opacity-100" : "opacity-0")}>
        |
      </span>
    </span>
  );
}
