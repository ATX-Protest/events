import { Megaphone, Heart } from 'lucide-react';
import Link from 'next/link';

const footerLinks = [
  { href: '/resources', label: 'Resources' },
  { href: '/get-alerts', label: 'Get Alerts' },
  { href: '/partner', label: 'Partner' },
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
];

export function Footer() {
  return (
    <footer
      className="border-t bg-muted/30 mt-auto"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
        <div className="flex flex-col gap-8">
          {/* Top section */}
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            {/* Brand */}
            <div className="flex flex-col gap-3" data-testid="footer-brand">
              <Link
                href="/"
                className="flex items-center gap-2.5 group w-fit"
                data-testid="footer-logo"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary shadow-sm transition-transform group-hover:scale-105" data-testid="footer-logo-icon">
                  <Megaphone className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
                </div>
                <div className="flex items-baseline gap-1" data-testid="footer-logo-text">
                  <span className="text-lg font-bold tracking-tight font-display">ATX</span>
                  <span className="text-lg font-bold tracking-tight text-primary font-display">Protests</span>
                </div>
              </Link>
              <p className="text-sm text-muted-foreground max-w-xs" data-testid="footer-tagline">
                Supporting peaceful civic action in Austin, Texas. Stay informed, stay safe, make your voice heard.
              </p>
            </div>

            {/* Navigation */}
            <nav className="flex flex-wrap gap-x-8 gap-y-3" data-testid="footer-nav">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors link-underline"
                  data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />

          {/* Bottom section */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between" data-testid="footer-bottom">
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground" data-testid="footer-made-with">
              Made with <Heart className="h-3 w-3 text-primary fill-primary" aria-label="love" /> in Austin, TX
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2" data-testid="footer-legal-links">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  data-testid={`footer-legal-${link.label.toLowerCase()}`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
