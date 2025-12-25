import { motion } from "framer-motion";

const references = [
  { industry: "Gastronomie", solution: "Komplettausstattung Restaurant" },
  { industry: "Einzelhandel", solution: "Corporate Wear Konzept" },
  { industry: "Healthcare", solution: "Medizinische Berufskleidung" },
  { industry: "Hotellerie", solution: "Luxury Hotel Uniforms" },
  { industry: "Handwerk", solution: "Funktionale Workwear" },
  { industry: "Corporate", solution: "Business Wear Linie" },
];

export const Portfolio = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-primary">Unsere Referenzen</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Erfolgreiche Projekte aus verschiedenen Branchen
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {references.map((ref, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="break-inside-avoid"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-soft hover:shadow-medium transition-smooth group cursor-pointer">
                <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                  <p className="text-muted-foreground text-center px-4">
                    Reference Image
                    <span className="block text-sm mt-2">{ref.industry}</span>
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-smooth"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-smooth">
                  <div className="w-12 h-1 bg-secondary mb-3 rounded-full"></div>
                  <p className="text-sm font-medium">{ref.industry}</p>
                  <p className="text-xs text-white/80">{ref.solution}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
