export const scrollToId = (id: string, offset = 0) => {
  if (typeof window === "undefined") return;

  const el = document.getElementById(id);
  if (!el) return;

  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
};


