import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n/I18nContext";

export const Newsletter = () => {
  const { t } = useI18n();

  return (
    <section id="newsletter" className="py-24 bg-muted/30">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-primary">
              {t.newsletter.heading}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t.newsletter.subheading}
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <div className="flex gap-3">
              <Input
                type="email"
                placeholder={t.newsletter.emailPlaceholder}
                className="h-12 px-6 rounded-full border-primary/20 focus:border-primary"
              />
              <Button
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full px-8 flex-shrink-0"
              >
                {t.newsletter.submit}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              {t.newsletter.legal}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
