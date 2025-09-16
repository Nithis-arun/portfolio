export type Theme = "light" | "dark";

export function getStoredTheme(): Theme | null {
  const t = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
  return t === "dark" || t === "light" ? t : null;
}

export function setTheme(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
  localStorage.setItem("theme", theme);
}

export function initTheme(defaultTheme: Theme = "dark") {
  const stored = getStoredTheme();
  const theme = stored ?? defaultTheme;
  if (theme === "dark") document.documentElement.classList.add("dark");
  else document.documentElement.classList.remove("dark");
}
