import { FacebookOutlined, InstagramOutlined, TwitterOutlined, YoutubeOutlined, PhoneOutlined, MailOutlined, EnvironmentOutlined,} from "@ant-design/icons";

const AppFooter = () => {
  return (
    <footer className="delvoura-header-theme delvoura-header-shell delvoura-footer-shell border-t border-[var(--color-border)] text-[color:var(--color-text)]">
      <div className="mx-auto w-[96%] max-w-6xl py-14">
        <div className="hidden gap-16 md:grid md:grid-cols-[1.3fr_1fr_1.1fr]">
          <div className="space-y-5">
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
                <FacebookOutlined />
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

          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-[0.25em] text-[color:var(--color-text)]">
              Useful Links
            </h4>
            <div className="grid gap-3 text-base text-[color:var(--color-text-muted)]">
              <span className="footer-link">Shipping</span>
              <span className="footer-link">Returns and Exchanges</span>
              <span className="footer-link">Privacy Policy</span>
              <span className="footer-link">Terms and Conditions</span>
              <span className="footer-link">Refund Policy</span>
              <span className="footer-link">Terms of Service</span>
              <span className="footer-link">Contact Us</span>
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

      <div className="mx-auto w-[92%] max-w-6xl pb-10 md:hidden">
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
                <FacebookOutlined />
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
              Useful Links
            </summary>
            <div className="mt-4 grid gap-3 text-base">
              <span className="footer-link">Shipping</span>
              <span className="footer-link">Returns and Exchanges</span>
              <span className="footer-link">Privacy Policy</span>
              <span className="footer-link">Terms and Conditions</span>
              <span className="footer-link">Refund Policy</span>
              <span className="footer-link">Terms of Service</span>
              <span className="footer-link">Contact Us</span>
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
            background: var(--color-accent);
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

