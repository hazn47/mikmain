import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageCircle, Instagram, ChevronDown } from "lucide-react";
import { useI18n } from "@/i18n/I18nContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

type Topic = "product" | "service" | "partner";
type Salutation = "mr" | "mrs" | "company" | "other";

interface ProductOption {
  id: string;
  name: string;
}

const COLOR_OPTIONS: { label: string; value: string; hex: string }[] = [
  { label: "Weiß", value: "white", hex: "#ffffff" },
  { label: "Schwarz", value: "black", hex: "#000000" },
  { label: "Navy", value: "navy", hex: "#001f3f" },
  { label: "Royalblau", value: "royalblue", hex: "#4169e1" },
  { label: "Grau", value: "gray", hex: "#808080" },
  { label: "Rot", value: "red", hex: "#e02424" },
  { label: "Grün", value: "green", hex: "#15803d" },
  { label: "Gelb", value: "yellow", hex: "#facc15" },
  { label: "Orange", value: "orange", hex: "#f97316" },
  { label: "Bordeaux", value: "bordeaux", hex: "#7f1d1d" },
];

const FABRIC_OPTIONS = [
  "60% Baumwolle / 40% Polyester",
  "95% Baumwolle / 5% Lycra",
  "100% Baumwolle",
];

const SIZE_OPTIONS = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

export const Contact = () => {
  const { t } = useI18n();
  const [topic, setTopic] = useState<Topic>("product");
  const [salutation, setSalutation] = useState<Salutation | undefined>();
  const [productOptions, setProductOptions] = useState<ProductOption[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  useEffect(() => {
    // Produkte für Produktanfragen laden
    fetch("/website-klamotten.json")
      .then((res) => res.json())
      .then((data: { id: string; name: string }[]) => {
        setProductOptions(data.map((p) => ({ id: p.id, name: p.name })));
      })
      .catch((err) => {
        console.error("Failed to load website-klamotten.json for contact form", err);
      });
  }, []);

  const toggleProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  };

  const toggleFromList = (value: string, list: string[], setter: (val: string[]) => void) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  };

  return (
    <section id="contact" className="py-24 bg-muted/30">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-primary">
            {t.contact.heading}
          </h2>
          <p className="text-xl text-muted-foreground">
            {t.contact.subheading}
          </p>
          <p className="text-xs text-muted-foreground">
            * Pflichtfelder
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              {/* Thema */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <p className="text-sm font-medium text-primary">
                    Thema <span className="text-red-500">*</span>
                  </p>
                  <Select
                    value={topic}
                    onValueChange={(value) => setTopic(value as Topic)}
                  >
                    <SelectTrigger className="h-12 rounded-lg border-primary/20 focus:border-primary">
                      <SelectValue placeholder="Thema wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="product">Produktanfrage</SelectItem>
                      <SelectItem value="service">Service-Beratung</SelectItem>
                      <SelectItem value="partner">Partnerschaft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Anrede */}
                <div className="space-y-1">
                  <p className="text-sm font-medium text-primary">
                    Anrede
                  </p>
                  <Select
                    value={salutation}
                    onValueChange={(value) => setSalutation(value as Salutation)}
                  >
                    <SelectTrigger className="h-12 rounded-lg border-primary/20 focus:border-primary">
                      <SelectValue placeholder="Bitte wählen" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mr">Herr</SelectItem>
                      <SelectItem value="mrs">Frau</SelectItem>
                      <SelectItem value="company">Unternehmen</SelectItem>
                      <SelectItem value="other">Divers / Sonstiges</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Basis-Felder */}
              <Input
                placeholder="Name *"
                className="h-12 rounded-lg border-primary/20 focus:border-primary"
                required
              />
              <Input
                type="email"
                placeholder="E-Mail *"
                className="h-12 rounded-lg border-primary/20 focus:border-primary"
                required
              />
              <Input
                type="tel"
                placeholder={
                  topic === "partner"
                    ? "Telefonnummer *"
                    : "Telefonnummer (optional)"
                }
                className="h-12 rounded-lg border-primary/20 focus:border-primary"
                required={topic === "partner"}
              />

              {/* Dynamische Felder je nach Thema */}
              {topic === "product" && (
                <div className="space-y-3">
                  <Input
                    placeholder={t.contact.quantity}
                    type="number"
                    min={1}
                    className="h-12 rounded-lg border-primary/20 focus:border-primary"
                    required
                  />
                  {/* Farben Mehrfachauswahl */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary">
                      Gewünschte Farben <span className="text-red-500">*</span>
                    </p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="flex h-12 w-full items-center justify-between rounded-lg border border-primary/20 bg-background px-3 text-sm text-left hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <span className={selectedColors.length ? "" : "text-muted-foreground"}>
                            {selectedColors.length
                              ? selectedColors.join(", ")
                              : "Farben auswählen"}
                          </span>
                          <ChevronDown className="h-4 w-4 opacity-60" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-72">
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">
                            Mehrere Farben durch Anklicken auswählen
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {COLOR_OPTIONS.map((color) => (
                              <button
                                key={color.value}
                                type="button"
                                onClick={() =>
                                  toggleFromList(color.value, selectedColors, setSelectedColors)
                                }
                                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                                  selectedColors.includes(color.value)
                                    ? "bg-secondary text-secondary-foreground border-secondary"
                                    : "bg-background text-foreground border-primary/20 hover:border-primary/60"
                                }`}
                              >
                                <span className="flex items-center gap-2">
                                  <span
                                    className="inline-block h-3 w-3 rounded-full border border-border"
                                    style={{ backgroundColor: color.hex }}
                                  />
                                  {color.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Stoffe Auswahl */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary">
                      Stoffe / Mischungen
                    </p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="flex h-12 w-full items-center justify-between rounded-lg border border-primary/20 bg-background px-3 text-sm text-left hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <span
                            className={selectedFabrics.length ? "" : "text-muted-foreground"}
                          >
                            {selectedFabrics.length
                              ? selectedFabrics.join(", ")
                              : "Stoffe auswählen (optional)"}
                          </span>
                          <ChevronDown className="h-4 w-4 opacity-60" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-72">
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">
                            Eine oder mehrere Mischungen wählen
                          </p>
                          <div className="flex flex-col gap-2">
                            {FABRIC_OPTIONS.map((fabric) => (
                              <button
                                key={fabric}
                                type="button"
                                onClick={() =>
                                  toggleFromList(fabric, selectedFabrics, setSelectedFabrics)
                                }
                                className={`w-full text-left px-3 py-2 text-xs rounded-lg border transition-colors ${
                                  selectedFabrics.includes(fabric)
                                    ? "bg-secondary text-secondary-foreground border-secondary"
                                    : "bg-background text-foreground border-primary/20 hover:border-primary/60"
                                }`}
                              >
                                {fabric}
                              </button>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Größen Auswahl */}
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-primary">
                      Größen (optional)
                    </p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="flex h-12 w-full items-center justify-between rounded-lg border border-primary/20 bg-background px-3 text-sm text-left hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <span
                            className={selectedSizes.length ? "" : "text-muted-foreground"}
                          >
                            {selectedSizes.length
                              ? selectedSizes.join(", ")
                              : "Größen auswählen (XS – XXXL)"}
                          </span>
                          <ChevronDown className="h-4 w-4 opacity-60" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent className="w-72">
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-muted-foreground">
                            Mehrere Größen wählbar
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {SIZE_OPTIONS.map((size) => (
                              <button
                                key={size}
                                type="button"
                                onClick={() =>
                                  toggleFromList(size, selectedSizes, setSelectedSizes)
                                }
                                className={`px-3 py-1 text-xs rounded-full border transition-colors ${
                                  selectedSizes.includes(size)
                                    ? "bg-secondary text-secondary-foreground border-secondary"
                                    : "bg-background text-foreground border-primary/20 hover:border-primary/60"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {productOptions.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-primary">
                        Relevante Produkte auswählen
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {productOptions.map((product) => (
                          <button
                            key={product.id}
                            type="button"
                            onClick={() => toggleProduct(product.id)}
                            className={`text-left text-xs px-3 py-2 rounded-full border transition-colors ${
                              selectedProducts.includes(product.id)
                                ? "bg-secondary text-secondary-foreground border-secondary"
                                : "bg-background text-foreground border-primary/20 hover:border-primary/60"
                            }`}
                          >
                            {product.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {topic === "service" && (
                <div className="space-y-3">
                  <Input
                    placeholder="Bereich / Service (z.B. Ausstattung Filialen)"
                    className="h-12 rounded-lg border-primary/20 focus:border-primary"
                  />
                  <Input
                    placeholder="Bevorzugter Zeitraum für Rückruf / Termin"
                    className="h-12 rounded-lg border-primary/20 focus:border-primary"
                  />
                </div>
              )}
              {topic === "partner" && (
                <div className="space-y-3">
                  <Input
                    placeholder="Unternehmen"
                    className="h-12 rounded-lg border-primary/20 focus:border-primary"
                  />
                </div>
              )}

              <div className="border-2 border-dashed border-primary/20 rounded-lg p-8 text-center hover:border-primary/40 transition-fast cursor-pointer">
                <p className="text-muted-foreground">
                  {t.contact.uploadLabel}
                  <span className="block text-sm mt-2">
                    {t.contact.uploadSub}
                  </span>
                </p>
              </div>
              <Textarea
                placeholder={`${t.contact.messagePlaceholder} *`}
                rows={4}
                className="rounded-lg border-primary/20 focus:border-primary"
                required
              />
            </div>

            <Button
              size="lg"
              className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground rounded-full py-6"
            >
              {t.contact.submit}
            </Button>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="bg-card p-8 rounded-2xl shadow-soft space-y-6">
              <h3 className="text-xl font-semibold text-primary">
                {t.contact.directContact}
              </h3>

              <div className="space-y-4">
                <a
                  href="mailto:info@mikmain.de"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-fast">
                    <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.contact.emailLabel}
                    </p>
                    <p className="font-medium text-foreground">
                      info@mikmain.de
                    </p>
                  </div>
                </a>

                <a
                  href="tel:+491711696958"
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-fast">
                    <Phone className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.contact.phoneLabel}
                    </p>
                    <p className="font-medium text-foreground">+49 171 1696958</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/491711696958"
                  className="flex items-center gap-4 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-fast">
                    <MessageCircle className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.contact.whatsappLabel}
                    </p>
                    <p className="font-medium text-foreground">
                      {t.contact.whatsappCta}
                    </p>
                  </div>
                </a>

                <a
                  href="https://instagram.com/mikmain"
                  className="flex items-center gap-4 group"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-fast">
                    <Instagram className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t.contact.instagramLabel}
                    </p>
                    <p className="font-medium text-foreground">@mikmain</p>
                  </div>
                </a>
              </div>
            </div>

            <div className="bg-primary/5 p-6 rounded-2xl">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <strong className="text-primary">
                  {t.contact.openingHoursTitle}
                </strong>
                <br />
                {t.contact.openingHoursLine1}
                <br />
                {t.contact.openingHoursLine2}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
