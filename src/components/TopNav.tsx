import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { scrollToId } from "@/lib/scrollToId";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

type SectionItem = {
  id: string;
  label: string;
};

const sections: SectionItem[] = [
  { id: "hero", label: "Start" },
  { id: "products", label: "Produkte" },
  { id: "services", label: "Services" },
  { id: "portfolio", label: "Portfolio" },
  { id: "franchise", label: "Franchise" },
  { id: "pricing", label: "Preise" },
  { id: "contact", label: "Kontakt" },
];

const NAV_HEIGHT = 80;

export const TopNav = () => {
  const [activeId, setActiveId] = useState<string>("hero");
  const navigate = useNavigate();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: `-${NAV_HEIGHT / 2}px 0px -40% 0px`,
      },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mt-3 flex h-16 items-center justify-between rounded-full bg-white/75 backdrop-blur-md shadow-md border border-white/60">
          <div className="flex items-center gap-3 pl-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center focus:outline-none"
            >
              <img
                src="/MikMainTEST.png"
                alt="MikMain Logo"
                className="h-10 w-auto"
              />
            </button>
          </div>

          <div className="flex items-center gap-6 pr-4">
            <nav className="flex items-center gap-3 text-sm font-medium text-primary">
              {sections.map((section) => {
                const isActive = activeId === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => scrollToId(section.id, NAV_HEIGHT + 8)}
                    className="group relative px-3 py-2 transition-colors hover:text-secondary focus:outline-none"
                  >
                    <span className="relative z-10">{section.label}</span>
                    <span
                      className={`absolute left-2 right-2 bottom-1 h-0.5 rounded-full transition-transform duration-200 ${
                        isActive
                          ? "scale-x-100 bg-secondary"
                          : "scale-x-0 bg-secondary"
                      } group-hover:scale-x-100`}
                    />
                  </button>
                );
              })}
            </nav>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

