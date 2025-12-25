import { createContext, ReactNode, useContext, useState } from "react";

type Language = "de" | "en";

type Translations = {
  [key in Language]: {
    hero: {
      titleLine1: string;
      titleLine2: string;
      description: string;
      ctaPrimary: string;
      ctaSecondary: string;
      imageLabel: string;
      imageSub: string;
    };
    services: {
      heading: string;
      subheading: string;
      items: {
        title: string;
        description: string;
      }[];
      cta: string;
    };
    contact: {
      heading: string;
      subheading: string;
      company: string;
      industry: string;
      quantity: string;
      colors: string;
      uploadLabel: string;
      uploadSub: string;
      messagePlaceholder: string;
      submit: string;
      directContact: string;
      emailLabel: string;
      phoneLabel: string;
      whatsappLabel: string;
      whatsappCta: string;
      instagramLabel: string;
      openingHoursTitle: string;
      openingHoursLine1: string;
      openingHoursLine2: string;
    };
    newsletter: {
      heading: string;
      subheading: string;
      emailPlaceholder: string;
      submit: string;
      legal: string;
    };
    pricing: {
      heading: string;
      subheading: string;
      columnQuantity: string;
      columnPrice: string;
      noteTitle: string;
      noteLines: string[];
      footer: string;
    };
    productGrid: {
      heading: string;
      subheading: string;
      badge: string;
      imageLabel: string;
      catalogButton: string;
    };
    catalog: {
      heading: string;
      subheading: string;
      filterAll: string;
      noProducts: string;
    };
    trustedBrands: {
      heading: string;
      placeholderName: string;
    };
    footer: {
      brandTitle: string;
      brandDescription: string;
      productsTitle: string;
      companyTitle: string;
      serviceTitle: string;
      nav: {
        businessWear: string;
        gastroHotel: string;
        healthcare: string;
        workwear: string;
        about: string;
        manufaktur: string;
        quality: string;
        career: string;
        contact: string;
        faq: string;
        downloads: string;
        franchise: string;
        legalCopyright: string;
        legalImprint: string;
        legalPrivacy: string;
        legalTerms: string;
      };
    };
    common: {
      languageGerman: string;
      languageEnglish: string;
      languageShortDe: string;
      languageShortEn: string;
    };
  };
};

const translations: Translations = {
  de: {
    hero: {
      titleLine1: "Premium Dienstbekleidung",
      titleLine2: "für Ihr Unternehmen",
      description:
        "Maßgeschneiderte Lösungen höchster Qualität. Von der Beratung bis zur individuellen Fertigung in unserer eigenen Manufaktur.",
      ctaPrimary: "Beratungsgespräch vereinbaren",
      ctaSecondary: "Katalog entdecken",
      imageLabel: "Premium Produkt Studio Shot",
      imageSub: "(Tailored Blazer)",
    },
    services: {
      heading: "All-in-One Komplettlösung",
      subheading:
        "Von der ersten Idee bis zur regelmäßigen Versorgung – alles aus einer Hand",
      items: [
        {
          title: "Design & Beratung",
          description:
            "Individuelle Konzeptentwicklung abgestimmt auf Ihre Corporate Identity",
        },
        {
          title: "Produktion & Fertigung",
          description:
            "Hochwertige Verarbeitung in unserer eigenen Manufaktur",
        },
        {
          title: "Logistik & Distribution",
          description:
            "Zuverlässige Lieferung direkt an Ihre Standorte bundesweit",
        },
        {
          title: "After-Sales Service",
          description:
            "Kontinuierliche Betreuung und Support für Nachbestellungen",
        },
      ],
      cta: "Service-Beratung anfragen",
    },
    contact: {
      heading: "Kontakt",
      subheading: "Lassen Sie uns über Ihr Projekt sprechen",
      company: "Unternehmen",
      industry: "Branche",
      quantity: "Geschätzte Menge",
      colors: "Gewünschte Farben",
      uploadLabel: "Logo / Design hochladen",
      uploadSub: "(Optional: PDF, PNG, JPG)",
      messagePlaceholder: "Ihre Nachricht",
      submit: "Anfrage senden",
      directContact: "Direkter Kontakt",
      emailLabel: "E-Mail",
      phoneLabel: "Telefon",
      whatsappLabel: "WhatsApp",
      whatsappCta: "Chat starten",
      instagramLabel: "Instagram",
      openingHoursTitle: "Öffnungszeiten:",
      openingHoursLine1: "Montag - Freitag: 08:00 - 18:00 Uhr",
      openingHoursLine2: "Samstag: Nach Vereinbarung",
    },
    newsletter: {
      heading: "Bleiben Sie informiert",
      subheading:
        "Erhalten Sie exklusive Einblicke in neue Kollektionen und Branchenneuheiten",
      emailPlaceholder: "Ihre E-Mail-Adresse",
      submit: "Anmelden",
      legal:
        "Mit der Anmeldung akzeptieren Sie unsere Datenschutzerklärung. Abmeldung jederzeit möglich.",
    },
    pricing: {
      heading: "Transparente Konditionen",
      subheading:
        "Faire Preise bei hoher Qualität – profitieren Sie von Mengenrabatten",
      columnQuantity: "Menge",
      columnPrice: "Preis pro Stück",
      noteTitle: "Bitte beachten Sie:",
      noteLines: [
        "• Preise verstehen sich zzgl. MwSt.",
        "• Individuelle Veredelung nach Aufwand",
        "• Produktionszeit: 6-8 Wochen ab Auftragserteilung",
        "• Express-Service auf Anfrage verfügbar",
      ],
      footer:
        "Die Preise sind Richtwerte und abhängig von Material, Veredelung und Komplexität.",
    },
    productGrid: {
      heading: "Unser Sortiment",
      subheading: "Professionelle Dienstbekleidung für jede Branche",
      badge: "Individualisierung möglich",
      imageLabel: "Studio Produktbild",
      catalogButton: "zum Katalog...",
    },
    catalog: {
      heading: "Vollständiger Katalog",
      subheading: "Entdecken Sie unser gesamtes Sortiment an Premium Dienstbekleidung",
      filterAll: "Alle Kategorien",
      noProducts: "Keine Produkte in dieser Kategorie gefunden",
    },
    trustedBrands: {
      heading: "Vertrauen von führenden Unternehmen",
      placeholderName: "Client Logo",
    },
    footer: {
      brandTitle: "MikMain",
      brandDescription:
        "Premium Dienstbekleidung & Manufaktur für anspruchsvolle Unternehmen.",
      productsTitle: "Produkte",
      companyTitle: "Unternehmen",
      serviceTitle: "Service",
      nav: {
        businessWear: "Business Wear",
        gastroHotel: "Gastro & Hotel",
        healthcare: "Healthcare",
        workwear: "Workwear",
        about: "Über uns",
        manufaktur: "Manufaktur",
        quality: "Qualität",
        career: "Karriere",
        contact: "Kontakt",
        faq: "FAQ",
        downloads: "Downloads",
        franchise: "Franchise",
        legalCopyright: "© 2024 MikMain GmbH. Alle Rechte vorbehalten.",
        legalImprint: "Impressum",
        legalPrivacy: "Datenschutz",
        legalTerms: "AGB",
      },
    },
    common: {
      languageGerman: "Deutsch",
      languageEnglish: "Englisch",
      languageShortDe: "DE",
      languageShortEn: "EN",
    },
  },
  en: {
    hero: {
      titleLine1: "Premium Workwear",
      titleLine2: "for your business",
      description:
        "Tailor-made solutions of the highest quality – from consulting to in-house manufacturing.",
      ctaPrimary: "Book a consultation",
      ctaSecondary: "Explore catalog",
      imageLabel: "Premium product studio shot",
      imageSub: "(Tailored blazer)",
    },
    services: {
      heading: "All-in-one solution",
      subheading:
        "From the first idea to ongoing supply – everything from a single source",
      items: [
        {
          title: "Design & consulting",
          description:
            "Individual concept development aligned with your corporate identity",
        },
        {
          title: "Production & manufacturing",
          description: "High-quality production in our in-house manufactory",
        },
        {
          title: "Logistics & distribution",
          description:
            "Reliable delivery directly to your locations throughout Germany",
        },
        {
          title: "After-sales service",
          description:
            "Continuous support and service for reorders and expansions",
        },
      ],
      cta: "Request service consultation",
    },
    contact: {
      heading: "Contact",
      subheading: "Let’s talk about your project",
      company: "Company",
      industry: "Industry",
      quantity: "Estimated quantity",
      colors: "Preferred colors",
      uploadLabel: "Upload logo / design",
      uploadSub: "(Optional: PDF, PNG, JPG)",
      messagePlaceholder: "Your message",
      submit: "Send request",
      directContact: "Direct contact",
      emailLabel: "Email",
      phoneLabel: "Phone",
      whatsappLabel: "WhatsApp",
      whatsappCta: "Start chat",
      instagramLabel: "Instagram",
      openingHoursTitle: "Opening hours:",
      openingHoursLine1: "Monday - Friday: 08:00 - 18:00",
      openingHoursLine2: "Saturday: By appointment",
    },
    newsletter: {
      heading: "Stay up to date",
      subheading:
        "Get exclusive insights into new collections and industry trends",
      emailPlaceholder: "Your email address",
      submit: "Subscribe",
      legal:
        "By subscribing you accept our privacy policy. You can unsubscribe at any time.",
    },
    pricing: {
      heading: "Transparent conditions",
      subheading:
        "Fair prices with high quality – benefit from quantity discounts",
      columnQuantity: "Quantity",
      columnPrice: "Price per piece",
      noteTitle: "Please note:",
      noteLines: [
        "• Prices are exclusive of VAT.",
        "• Individual finishing depending on effort",
        "• Production time: 6–8 weeks from order",
        "• Express service available on request",
      ],
      footer:
        "Prices are guide values and depend on material, finishing and complexity.",
    },
    productGrid: {
      heading: "Our collection",
      subheading: "Professional workwear for every industry",
      badge: "Customization possible",
      imageLabel: "Studio product image",
      catalogButton: "to catalog...",
    },
    catalog: {
      heading: "Full Catalog",
      subheading: "Discover our complete range of premium workwear",
      filterAll: "All Categories",
      noProducts: "No products found in this category",
    },
    trustedBrands: {
      heading: "Trusted by leading companies",
      placeholderName: "Client logo",
    },
    footer: {
      brandTitle: "MikMain",
      brandDescription:
        "Premium workwear & manufactory for demanding companies.",
      productsTitle: "Products",
      companyTitle: "Company",
      serviceTitle: "Service",
      nav: {
        businessWear: "Business wear",
        gastroHotel: "Gastro & hotel",
        healthcare: "Healthcare",
        workwear: "Workwear",
        about: "About us",
        manufaktur: "Manufactory",
        quality: "Quality",
        career: "Career",
        contact: "Contact",
        faq: "FAQ",
        downloads: "Downloads",
        franchise: "Franchise",
        legalCopyright: "© 2024 MikMain GmbH. All rights reserved.",
        legalImprint: "Imprint",
        legalPrivacy: "Privacy policy",
        legalTerms: "Terms",
      },
    },
    common: {
      languageGerman: "German",
      languageEnglish: "English",
      languageShortDe: "DE",
      languageShortEn: "EN",
    },
  },
};

type I18nContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations[Language];
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export const I18nProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>("de");

  return (
    <I18nContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      {children}
    </I18nContext.Provider>
  );
};

export const useI18n = () => {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return ctx;
};


