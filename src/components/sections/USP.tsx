import { motion } from "framer-motion";
import { Shield, Sparkles, Clock, Users, Award, TrendingUp } from "lucide-react";

const usps = [
  {
    icon: Shield,
    title: "Premium Qualität",
    description: "Hochwertige Materialien und erstklassige Verarbeitung für langlebige Bekleidung.",
  },
  {
    icon: Sparkles,
    title: "Individuelle Anpassung",
    description: "Maßgeschneiderte Lösungen perfekt abgestimmt auf Ihre Corporate Identity.",
  },
  {
    icon: Clock,
    title: "Zuverlässige Lieferung",
    description: "Planbare Produktionszeiten und transparente Kommunikation.",
  },
  {
    icon: Users,
    title: "Persönliche Beratung",
    description: "Erfahrene Experten begleiten Sie von der Planung bis zur Umsetzung.",
  },
  {
    icon: Award,
    title: "Eigene Manufaktur",
    description: "Produktion in Deutschland mit höchsten Qualitätsstandards.",
  },
  {
    icon: TrendingUp,
    title: "Franchise-Lösungen",
    description: "Skalierbare Konzepte für Ihre bundesweite Expansion.",
  },
];

export const USP = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {usps.map((usp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-card p-8 rounded-2xl shadow-soft hover:shadow-medium transition-smooth"
            >
              <div className="relative mb-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <usp.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-secondary rounded-full"></div>
              </div>
              <h3 className="text-xl font-semibold text-primary mb-3">{usp.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{usp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
