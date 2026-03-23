import {InstagramOutlined, TwitterOutlined, YoutubeOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined, FacebookFilled,} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTES } from "../Constants";

const AppFooter = () => {
  return (
    <footer className="delvoura-header-theme delvoura-header-shell delvoura-footer-shell border-t border-[var(--color-border)] text-[color:var(--color-text)]">
      <div className="delvoura-container py-14">
        <div className="hidden gap-20 md:grid md:grid-cols-[1fr_1.2fr_1fr]">
          <div className="space-y-5 max-w-[320px]">
            <img
              src="/assets/images/logo/logo-white.png"
              alt="Delvoura"
              className="h-10 w-auto"
            />
            <p className="text-base leading-7 text-[color:var(--color-text-muted)]">
              Delvoura delivers elevated fragrance stories with modern elegance,
              curated notes, and timeless character.
            </p>
            <div className="flex items-center gap-4 text-xl">
              <span className="cursor-pointer text-[color:var(--color-text-muted)] transition hover:text-[color:var(--color-text)]">
                <FacebookFilled />
              </span>
              <span className="cursor-pointer text-[color:var(--color-text-muted)] transition hover:text-[color:var(--color-text)]">
                <InstagramOutlined />
              </span>
              <span className="cursor-pointer text-[color:var(--color-text-muted)] transition hover:text-[color:var(--color-text)]">
                <TwitterOutlined />
              </span>
              <span className="cursor-pointer text-[color:var(--color-text-muted)] transition hover:text-[color:var(--color-text)]">
                <YoutubeOutlined />
              </span>
            </div>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--color-text)]">
                Help
              </h4>
              <div className="grid gap-3 text-base text-[color:var(--color-text-muted)]">
                <Link to={ROUTES.SHIPPING} className="footer-link">
                  Shipping
                </Link>
                <Link to={ROUTES.RETURNS_EXCHANGES} className="footer-link">
                  Returns and Exchanges
                </Link>
                <Link to={ROUTES.CONTACT} className="footer-link">
                  Contact Us
                </Link>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--color-text)]">
                Policies
              </h4>
              <div className="grid gap-3 text-base text-[color:var(--color-text-muted)]">
                <Link to={ROUTES.PRIVACY_POLICY} className="footer-link">
                  Privacy Policy
                </Link>
                <Link to={ROUTES.TERMS_CONDITIONS} className="footer-link">
                  Terms and Conditions
                </Link>
                <Link to={ROUTES.REFUND_POLICY} className="footer-link">
                  Refund Policy
                </Link>
                <Link to={ROUTES.TERMS_OF_SERVICE} className="footer-link">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--color-text)]">
              Store Info
            </h4>
            <div className="space-y-3 text-base text-[color:var(--color-text-muted)]">
              <div className="flex items-start gap-3">
                <PhoneOutlined className="mt-0.5 text-[color:var(--color-accent)]" />
                <span>+91 90000 00000</span>
              </div>
              <div className="flex items-start gap-3">
                <MailOutlined className="mt-0.5 text-[color:var(--color-accent)]" />
                <span>support@delvoura.com</span>
              </div>
              <div className="flex items-start gap-3">
                <EnvironmentOutlined className="mt-0.5 text-[color:var(--color-accent)]" />
                <span>
                  501, Delvoura House, MG Road, Bengaluru, Karnataka 560001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 hidden border-t border-[color:var(--color-border-dark)] pt-6 text-center text-sm text-[color:var(--color-text-muted)] md:block">
          © 2025–26 All Rights Reserved By Delvoura
        </div>
      </div>

      <div className="delvoura-container pb-10 md:hidden">
        <div className="space-y-6 text-[color:var(--color-text-muted)]">
          <div className="space-y-4">
            <img
              src="/assets/images/logo/logo-white.png"
              alt="Delvoura"
              className="h-10 w-auto"
            />
            <p className="text-base leading-7">
              Delvoura delivers elevated fragrance stories with modern elegance,
              curated notes, and timeless character.
            </p>
            <div className="flex items-center gap-4 text-xl">
              <span className="cursor-pointer text-[color:var(--color-text-muted)] transition hover:text-[color:var(--color-text)]">
                <FacebookFilled />
              </span>
              <span className="cursor-pointer text-[color:var(--color-text-muted)] transition hover:text-[color:var(--color-text)]">
                <InstagramOutlined />
              </span>
              <span className="cursor-pointer text-[color:var(--color-text-muted)] transition hover:text-[color:var(--color-text)]">
                <TwitterOutlined />
              </span>
              <span className="cursor-pointer text-[color:var(--color-text-muted)] transition hover:text-[color:var(--color-text)]">
                <YoutubeOutlined />
              </span>
            </div>
          </div>

          <details className="border-b border-[color:var(--color-border-dark)] pb-4">
            <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--color-text)]">
              Help
            </summary>
            <div className="mt-4 grid gap-3 text-base">
              <Link to={ROUTES.SHIPPING} className="footer-link">
                Shipping
              </Link>
              <Link to={ROUTES.RETURNS_EXCHANGES} className="footer-link">
                Returns and Exchanges
              </Link>
              <Link to={ROUTES.CONTACT} className="footer-link">
                Contact Us
              </Link>
            </div>
          </details>

          <details className="border-b border-[color:var(--color-border-dark)] pb-4">
            <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--color-text)]">
              Policies
            </summary>
            <div className="mt-4 grid gap-3 text-base">
              <Link to={ROUTES.PRIVACY_POLICY} className="footer-link">
                Privacy Policy
              </Link>
              <Link to={ROUTES.TERMS_CONDITIONS} className="footer-link">
                Terms and Conditions
              </Link>
              <Link to={ROUTES.REFUND_POLICY} className="footer-link">
                Refund Policy
              </Link>
              <Link to={ROUTES.TERMS_OF_SERVICE} className="footer-link">
                Terms of Service
              </Link>
            </div>
          </details>

          <details className="border-b border-[color:var(--color-border-dark)] pb-4">
            <summary className="cursor-pointer text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--color-text)]">
              Store Info
            </summary>
            <div className="mt-4 space-y-3 text-base">
              <div className="flex items-start gap-3">
                <PhoneOutlined className="mt-0.5 text-[color:var(--color-accent)]" />
                <span>+91 90000 00000</span>
              </div>
              <div className="flex items-start gap-3">
                <MailOutlined className="mt-0.5 text-[color:var(--color-accent)]" />
                <span>support@delvoura.com</span>
              </div>
              <div className="flex items-start gap-3">
                <EnvironmentOutlined className="mt-0.5 text-[color:var(--color-accent)]" />
                <span>
                  501, Delvoura House, MG Road, Bengaluru, Karnataka 560001
                </span>
              </div>
            </div>
          </details>

          <div className="pt-4 text-center text-sm text-[color:var(--color-text-muted)]">
            © 2025–26 All Rights Reserved By Delvoura
          </div>
        </div>
      </div>

      <style>
        {`
          .footer-link {
            position: relative;
            cursor: pointer;
            width: fit-content;
          }
          .footer-link::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -4px;
            width: 0;
            height: 2px;
            background: var(--color-border);
            transition: width 0.25s ease;
          }
          .footer-link:hover::after {
            width: 100%;
          }
        `}
      </style>
    </footer>
  );
};

export default AppFooter;
