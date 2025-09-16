import { useEffect, useState } from "react";

export function useScrollSpy(ids: string[], offset = 88) {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY + offset + 1;
      let current = ids[0] ?? "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.offsetTop;
        if (y >= top) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ids, offset]);

  return active;
}
