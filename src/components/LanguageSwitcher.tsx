import { useI18n } from "@/i18n/I18nContext";
import { Button } from "./ui/button";

export const LanguageSwitcher = () => {
  const { lang, setLang, t } = useI18n();

  return (
    <div className="inline-flex items-center gap-1 rounded-full bg-background/80 border border-border px-1 py-1 backdrop-blur-sm shadow-soft">
      <Button
        type="button"
        size="sm"
        variant={lang === "de" ? "default" : "ghost"}
        className="h-7 px-3 text-xs"
        onClick={() => setLang("de")}
      >
        {t.common.languageShortDe}
      </Button>
      <Button
        type="button"
        size="sm"
        variant={lang === "en" ? "default" : "ghost"}
        className="h-7 px-3 text-xs"
        onClick={() => setLang("en")}
      >
        {t.common.languageShortEn}
      </Button>
    </div>
  );
};



