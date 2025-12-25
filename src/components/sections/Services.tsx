import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Palette, Package, Truck, HeadphonesIcon } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import { scrollToId } from "@/lib/scrollToId";

const services = [
  {
    icon: Palette,
    title: "Design & Beratung",
    description:
      "Individuelle Konzeptentwicklung abgestimmt auf Ihre Corporate Identity",
  },
  {
    icon: Package,
    title: "Produktion & Fertigung",
    description:
      "Hochwertige Verarbeitung in unserer eigenen Manufaktur",
  },
  {
    icon: Truck,
    title: "Logistik & Distribution",
    description:
      "Zuverlässige Lieferung direkt an Ihre Standorte bundesweit",
  },
  {
    icon: HeadphonesIcon,
    title: "After-Sales Service",
    description:
      "Kontinuierliche Betreuung und Support für Nachbestellungen",
  },
];

export const Services = () => {
  const { t } = useI18n();

  return (
    <section id="services" className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-primary">
            {t.services.heading}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.services.subheading}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-medium transition-smooth"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border-2 border-primary/20">
                  <service.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {t.services.items[index]?.title ?? service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t.services.items[index]?.description ?? service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 rounded-full shadow-medium"
            onClick={() => scrollToId("contact")}
          >
            {t.services.cta}
          </Button>
        </div>
      </div>
    </section>
  );
};
