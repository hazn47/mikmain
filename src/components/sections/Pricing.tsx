import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";

const tiers = [
  { quantity: "50-100 Stück", price: "ab 89€" },
  { quantity: "100-250 Stück", price: "ab 79€" },
  { quantity: "250-500 Stück", price: "ab 69€" },
  { quantity: "500-1000 Stück", price: "ab 59€" },
  { quantity: "1000+ Stück", price: "Auf Anfrage" },
];

export const Pricing = () => {
  const { t } = useI18n();

  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container max-w-4xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-primary">
            {t.pricing.heading}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t.pricing.subheading}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-card rounded-2xl shadow-medium overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="px-8 py-4 text-left font-semibold">
                    {t.pricing.columnQuantity}
                  </th>
                  <th className="px-8 py-4 text-left font-semibold">
                    {t.pricing.columnPrice}
                  </th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((tier, index) => (
                  <tr
                    key={index}
                    className="border-b border-border last:border-0 hover:bg-muted/50 transition-fast"
                  >
                    <td className="px-8 py-4 font-medium">{tier.quantity}</td>
                    <td className="px-8 py-4 text-primary font-semibold">
                      {tier.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-muted/50 px-8 py-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">
                  {t.pricing.noteTitle}
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  {t.pricing.noteLines.map((line, idx) => (
                    <li key={idx}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>

        <p className="text-center text-muted-foreground mt-8">
          {t.pricing.footer}
        </p>
      </div>
    </section>
  );
};
