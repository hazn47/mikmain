import { useI18n } from "@/i18n/I18nContext";

export const Footer = () => {
  const { t } = useI18n();

  return (
    <footer id="footer" className="bg-primary text-primary-foreground py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">
              {t.footer.brandTitle}
            </h3>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              {t.footer.brandDescription}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              {t.footer.productsTitle}
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-secondary transition-fast">
                  {t.footer.nav.businessWear}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-fast">
                  {t.footer.nav.gastroHotel}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-fast">
                  {t.footer.nav.healthcare}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-fast">
                  {t.footer.nav.workwear}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              {t.footer.companyTitle}
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-secondary transition-fast">
                  {t.footer.nav.about}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-fast">
                  {t.footer.nav.manufaktur}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-fast">
                  {t.footer.nav.quality}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-fast">
                  {t.footer.nav.career}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">
              {t.footer.serviceTitle}
            </h4>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>
                <a href="#" className="hover:text-secondary transition-fast">
                  {t.footer.nav.contact}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-fast">
                  {t.footer.nav.faq}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-fast">
                  {t.footer.nav.downloads}
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-secondary transition-fast">
                  {t.footer.nav.franchise}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <p>{t.footer.nav.legalCopyright}</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-secondary transition-fast">
                {t.footer.nav.legalImprint}
              </a>
              <a href="#" className="hover:text-secondary transition-fast">
                {t.footer.nav.legalPrivacy}
              </a>
              <a href="#" className="hover:text-secondary transition-fast">
                {t.footer.nav.legalTerms}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
