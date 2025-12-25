import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useI18n } from "@/i18n/I18nContext";
import { Link } from "react-router-dom";

type ImageKind = "front" | "kragen" | "ruecken" | "seite" | "umhang";

interface WebProduct {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  materials?: string[];
  sizes?: string[];
  customization?: boolean;
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
      // Sonderfall: Hemd hat "Front.jpg" mit großem F
      fileName = folder === "Hemd" ? "Front.jpg" : "front.jpg";
      break;
  }

  const fileEncoded = encodeURIComponent(fileName);
  const baseEncoded = encodeURIComponent(baseFolder);

  return `/${baseEncoded}/${folderEncoded}/${fileEncoded}`;
};

export const ProductGrid = () => {
  const { t } = useI18n();
  const [products, setProducts] = useState<WebProduct[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<WebProduct | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;

    fetch(WEBSITE_KLAMOTTEN_URL)
      .then((res) => res.json())
      .then((data: WebProduct[]) => {
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

  return (
    <section id="products" className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-primary">
            {t.productGrid.heading}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.productGrid.subheading}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {products.map((product, index) => (
            <motion.button
              key={product.id ?? index}
              type="button"
              onClick={() => {
                setSelectedProduct(product);
                setDialogOpen(true);
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer text-left"
            >
              <div className="relative aspect-[3/4] bg-muted rounded-2xl mb-4 overflow-hidden shadow-soft hover:shadow-medium transition-smooth">
                <img
                  src={buildImageSrc(product.folder, "front")}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <Badge className="absolute top-4 right-4 bg-secondary text-secondary-foreground">
                  {t.productGrid.badge}
                </Badge>
              </div>
              <h3 className="text-lg font-semibold text-primary group-hover:text-secondary transition-fast mb-1 relative inline-block">
                {product.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-secondary scale-x-0 group-hover:scale-x-100 transition-smooth origin-left"></span>
              </h3>
              <p className="text-muted-foreground text-sm">{product.category}</p>
            </motion.button>
          ))}
        </div>

        <div className="text-center">
          <Link to="/catalog">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-8 py-6 rounded-full shadow-medium"
            >
              {t.productGrid.catalogButton}
            </Button>
          </Link>
        </div>
      </div>

      {/* Produkt-Detail-Dialog */}
      <Dialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) {
            setSelectedProduct(null);
          }
        }}
      >
        <DialogContent>
          {selectedProduct && (
            <div className="space-y-4">
              <DialogHeader>
                <DialogTitle>{selectedProduct.name}</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="sm:w-1/2">
                  <img
                    src={buildImageSrc(selectedProduct.folder, "front")}
                    alt={selectedProduct.name}
                    className="w-full h-full max-h-72 object-cover rounded-md"
                  />
                </div>
                <div className="sm:w-1/2 flex flex-col gap-3">
                  <Badge variant="outline" className="w-fit text-xs">
                    {selectedProduct.category}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {selectedProduct.description}
                  </p>
                  {selectedProduct.features?.length ? (
                    <ul className="mt-1 list-disc pl-4 text-xs text-muted-foreground space-y-1">
                      {selectedProduct.features.slice(0, 4).map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  ) : null}
                  <div className="pt-2 text-sm">
                    <Link
                      to="/catalog"
                      className="text-primary hover:text-secondary font-medium underline-offset-2 hover:underline"
                    >
                      mehr Infos hier..
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};
