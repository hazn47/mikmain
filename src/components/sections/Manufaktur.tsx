import { motion } from "framer-motion";
import { Check } from "lucide-react";

const features = [
  "YKK Premium Reißverschlüsse",
  "Zertifizierte Materialien",
  "Made in Germany",
  "Nachhaltige Produktion",
];

const sections = [
  {
    title: "Unsere Manufaktur",
    text: "In unserer eigenen Produktionsstätte vereinen wir traditionelles Handwerk mit modernster Technologie. Jedes Kleidungsstück wird mit höchster Präzision und Liebe zum Detail gefertigt.",
  },
  {
    title: "Qualität als Standard",
    text: "Wir verwenden ausschließlich hochwertige Materialien und arbeiten mit führenden Lieferanten zusammen. Jeder Produktionsschritt unterliegt strengen Qualitätskontrollen.",
  },
  {
    title: "Nachhaltigkeit & Verantwortung",
    text: "Umweltbewusstsein und soziale Verantwortung sind fest in unserer Unternehmensphilosophie verankert. Wir setzen auf langlebige Produkte und nachhaltige Produktionsprozesse.",
  },
];

export const Manufaktur = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="space-y-24">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                index % 2 === 1 ? "lg:grid-flow-dense" : ""
              }`}
            >
              <div
                className={`space-y-6 ${
                  index % 2 === 1 ? "lg:col-start-2" : ""
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-1 h-16 bg-secondary rounded-full flex-shrink-0"></div>
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
                      {section.title}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {section.text}
                    </p>
                  </div>
                </div>

                {index === 0 && (
                  <div className="grid grid-cols-2 gap-4 pt-6">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div
                className={`aspect-[4/3] bg-muted rounded-2xl shadow-medium flex items-center justify-center ${
                  index % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : ""
                }`}
              >
                <p className="text-muted-foreground text-center px-4">
                  Manufaktur Image
                  <span className="block text-sm mt-2">{section.title}</span>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
