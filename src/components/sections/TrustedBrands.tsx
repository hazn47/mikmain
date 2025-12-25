import { motion } from "framer-motion";
import { useI18n } from "@/i18n/I18nContext";

const clientLogos = [
  {
    src: "/logos/clients/kujath.png",
    name: "Gärtnerei Kujath",
    size: "normal", // max-h-16 (64px)
  },
  {
    src: "/logos/clients/fluffy.png",
    name: "Fluffy Fluffy Cafe",
    size: "large-15", // 15% größer = max-h-18 (72px)
  },
  {
    src: "/logos/clients/HANDWRITE GLANZK 1.png",
    name: "HANDWRITE GLANZK",
    size: "large-15", // 15% größer = max-h-18 (72px)
  },
  {
    src: "/logos/clients/KOSTARELOS Orange 1.png",
    name: "KOSTARELOS",
    size: "small-10", // 10% kleiner = max-h-14 (56px)
  },
  {
    src: "/logos/clients/WhatsApp_Image_2025-12-02_at_15.49.43-removebg-preview 1.png",
    name: "Client",
    size: "normal",
  },
  {
    src: "/logos/clients/harput et vector 1.png",
    name: "Harput Et",
    size: "large", // 25% größer = max-h-20 (80px)
  },
  {
    src: "/logos/clients/SHLogo.png",
    name: "SH Logo",
    size: "large-55", // 40% + 15% = 55% größer = max-h-[103.04px]
  },
];

export const TrustedBrands = () => {
  const { t } = useI18n();

  // Berechne die Breite eines Logos: w-52 (208px) + gap-12 (48px) = 256px
  const logoWidth = 208 + 48; // 256px pro Logo
  const scrollDistance = clientLogos.length * logoWidth; // Genau eine vollständige Kopie

  return (
    <section id="trusted-brands" className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-primary">
            {t.trustedBrands.heading}
          </h2>
          <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-12 items-center"
            animate={{
              x: [0, -scrollDistance],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "linear",
              },
            }}
          >
            {[...clientLogos, ...clientLogos].map((logo, index) => {
              // URL-encoden nur für Dateinamen mit Leerzeichen oder Sonderzeichen
              let imageSrc = logo.src;
              if (logo.src.includes(" ")) {
                const pathParts = logo.src.split("/");
                const fileName = pathParts[pathParts.length - 1];
                const encodedFileName = encodeURIComponent(fileName);
                imageSrc = [...pathParts.slice(0, -1), encodedFileName].join("/");
              }

              return (
                <div
                  key={`${logo.src}-${index}`}
                  className="flex-shrink-0 w-52 h-24 bg-background rounded-lg flex items-center justify-center px-6"
                >
                  <img
                    src={imageSrc}
                    alt={`${t.trustedBrands.heading} – Logo von ${logo.name}`}
                    loading="lazy"
                    className={`w-auto object-contain ${
                      logo.size === "large" 
                        ? "max-h-20" // 25% größer (80px)
                        : logo.size === "large-55"
                        ? "max-h-[103.04px]" // 40% + 15% = 55% größer (103.04px)
                        : logo.size === "large-40"
                        ? "max-h-[89.6px]" // 40% größer (89.6px)
                        : logo.size === "large-15"
                        ? "max-h-[72px]" // 15% größer (72px)
                        : logo.size === "small-10"
                        ? "max-h-[57.6px]" // 10% kleiner (57.6px)
                        : "max-h-16" // normal (64px)
                    }`}
                    onError={(e) => {
                      // Fallback für fehlende Bilder
                      console.error(`Failed to load image: ${imageSrc} (original: ${logo.src})`);
                    }}
                  />
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
