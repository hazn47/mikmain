import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { scrollToId } from "@/lib/scrollToId";

export const Franchise = () => {
  return (
    <section id="franchise" className="py-24 bg-background">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-primary">
              Franchise & Key Account Lösungen
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Profitieren Sie von unserer Expertise bei der bundesweiten Ausstattung
              Ihrer Standorte. Einheitliches Erscheinungsbild, zentrale Verwaltung,
              lokale Lieferung.
            </p>
          </div>

          {/* Simple Supply Chain Illustration */}
          <div className="py-12 px-8">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center mb-3">
                  <span className="text-2xl">🏢</span>
                </div>
                <p className="text-sm font-medium text-primary">Zentrale</p>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-12 h-0.5 bg-primary/30"></div>
                <ArrowRight className="w-5 h-5 text-primary" />
                <div className="w-12 h-0.5 bg-primary/30"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-3">
                  <span className="text-2xl">🏭</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Manufaktur
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="w-12 h-0.5 bg-primary/30"></div>
                <ArrowRight className="w-5 h-5 text-primary" />
                <div className="w-12 h-0.5 bg-primary/30"></div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <span className="text-2xl">📍</span>
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  Standorte
                </p>
              </div>
            </div>
          </div>

          <Button
            size="lg"
            className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 rounded-full shadow-medium"
            onClick={() => scrollToId("contact")}
          >
            Partnerschaft besprechen
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
