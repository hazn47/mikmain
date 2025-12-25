import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n/I18nContext";
import { TopNav } from "@/components/TopNav";
import { Footer } from "@/components/sections/Footer";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ImageKind = "front" | "kragen" | "ruecken" | "seite" | "umhang";

interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  materials?: string[];
  sizes?: string[];
  customization: boolean;
  folder: string;
  images: ImageKind[];
}

const WEBSITE_KLAMOTTEN_URL = "/website-klamotten.json";

const buildImageSrc = (folder: string, type: ImageKind): string => {
  const baseFolder = "Website Klamotten";
  const folderEncoded = encodeURIComponent(folder);

  let fileName: string;
  switch (type) {
    case "kragen":
      fileName = "kragen.jpg";
      break;
    case "ruecken":
      fileName = "rücken.jpg";
      break;
    case "seite":
      fileName = "seite.jpg";
      break;
    case "umhang":
      fileName = "umhang.jpg";
      break;
    case "front":
    default:
      fileName = folder === "Hemd" ? "Front.jpg" : "front.jpg";
      break;
  }

  const fileEncoded = encodeURIComponent(fileName);
  const baseEncoded = encodeURIComponent(baseFolder);

  return `/${baseEncoded}/${folderEncoded}/${fileEncoded}`;
};

export default function Catalog() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Alle Kategorien");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch(WEBSITE_KLAMOTTEN_URL)
      .then((res) => res.json())
      .then((data: Product[]) => {
        if (isMounted) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.error("Failed to load website-klamotten.json", err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => set.add(p.category));
    return ["Alle Kategorien", ...Array.from(set)];
  }, [products]);

  const filteredProducts =
    selectedCategory === "Alle Kategorien"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      
      <section className="pt-32 pb-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8 flex flex-col gap-4"
          >
            <div className="w-full max-w-3xl flex justify-start">
              <Button
                size="sm"
                onClick={() => navigate("/#products")}
                className="text-sm bg-primary text-primary-foreground hover:bg-primary/90 transition-transform duration-150 hover:scale-[1.03]"
              >
                ← Zurück zur Produktübersicht
              </Button>
            </div>
            <div className="w-full flex justify-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary text-center">
                {t.catalog.heading}
              </h1>
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-center">
              {t.catalog.subheading}
            </p>
          </motion.div>

          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : ""
                }
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-muted-foreground text-lg">
                {t.catalog.noProducts}
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id ?? `${product.name}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-card rounded-2xl shadow-soft hover:shadow-medium transition-smooth overflow-hidden border border-border hover:border-primary/20"
                  onClick={() => {
                    setSelectedProduct(product);
                    setSelectedImageIndex(0);
                    setDialogOpen(true);
                  }}
                >
                  <div className="relative bg-muted">
                    <div className="grid grid-cols-2 gap-1 aspect-[3/4]">
                      {product.images.map((kind) => (
                        <div
                          key={`${product.id}-${kind}`}
                          className="relative w-full h-full overflow-hidden"
                        >
                          <img
                            src={buildImageSrc(product.folder, kind)}
                            alt={`${product.name} – ${kind}`}
                            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-[1.03]"
                            loading="lazy"
                          />
                        </div>
                      ))}
                    </div>
                    {product.customization && (
                      <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                        {t.productGrid.badge}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                    </div>
                    <h3 className="text-xl font-semibold text-primary mb-2 relative inline-block">
                      {product.name}
                      <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {product.description}
                    </p>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-primary mb-1">
                          Features:
                        </p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {product.features.map((feature, idx) => (
                            <li key={idx}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                      
                      {product.materials && (
                        <div>
                          <p className="text-xs font-semibold text-primary mb-1">
                            Materialien:
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {product.materials.join(", ")}
                          </p>
                        </div>
                      )}
                      
                      {product.sizes && (
                        <div>
                          <p className="text-xs font-semibold text-primary mb-1">
                            Größen:
                          </p>
                          <p className="text-xs text-muted-foreground">
                            auf Anfrage alles verfügbar
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Produkt-Galerie-Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setSelectedProduct(null);
            setSelectedImageIndex(0);
          }
        }}
      >
        <DialogContent className="max-w-4xl">
          {selectedProduct && (
            <div className="flex flex-col gap-6 sm:flex-row">
              {/* Linke Seite: Große Bildansicht + Thumbnails */}
              <div className="sm:w-5/12 space-y-4">
                <div className="relative w-full overflow-hidden rounded-xl border border-border bg-white">
                  <img
                    src={buildImageSrc(
                      selectedProduct.folder,
                      selectedProduct.images[selectedImageIndex],
                    )}
                    alt={`${selectedProduct.name} – ${selectedProduct.images[selectedImageIndex]}`}
                    className="w-full h-auto max-h-[360px] object-contain bg-white"
                  />
                </div>
                <div className="flex gap-2 overflow-x-auto">
                  {selectedProduct.images.map((kind, idx) => {
                    const isActive = idx === selectedImageIndex;
                    return (
                      <button
                        key={`${selectedProduct.id}-thumb-${kind}`}
                        type="button"
                        onClick={() => setSelectedImageIndex(idx)}
                        className={`relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border transition-all ${
                          isActive
                            ? "border-primary ring-1 ring-primary/50"
                            : "border-border hover:border-primary/30"
                        }`}
                      >
                        <img
                          src={buildImageSrc(selectedProduct.folder, kind)}
                          alt={`${selectedProduct.name} – ${kind}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Rechte Seite: Produktinfos */}
              <div className="sm:w-1/2 space-y-4">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-semibold text-primary relative inline-block">
                    {selectedProduct.name}
                    <span className="absolute -bottom-1 left-0 w-16 h-0.5 bg-secondary" />
                  </DialogTitle>
                </DialogHeader>

                <Badge variant="outline" className="text-xs w-fit">
                  {selectedProduct.category}
                </Badge>

                <p className="text-sm text-muted-foreground">
                  {selectedProduct.description}
                </p>

                <div className="space-y-3 text-sm">
                  {selectedProduct.features?.length ? (
                    <div>
                      <p className="font-semibold text-primary mb-1">
                        Features
                      </p>
                      <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1">
                        {selectedProduct.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}

                  {selectedProduct.materials && (
                    <div>
                      <p className="font-semibold text-primary mb-1">
                        Stoffeigenschaften / Material
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {selectedProduct.materials.join(", ")}
                      </p>
                    </div>
                  )}

                  {selectedProduct.sizes && (
                    <div>
                      <p className="font-semibold text-primary mb-1">
                        Größen / Größentabelle
                      </p>
                      <p className="text-xs text-muted-foreground">
                        auf Anfrage alles verfügbar
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}

