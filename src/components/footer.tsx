import { Megaphone } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer
      className="border-t bg-background py-8 mt-auto"
      data-testid="footer"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
                <Megaphone className="h-4 w-4 text-primary-foreground" aria-hidden="true" />
              </div>
              <Link href="/" className="flex items-center" data-testid="footer-logo">
                <span className="text-lg font-bold">ATX</span>
                <span className="text-lg font-bold text-primary ml-1">Protests</span>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground text-center md:text-right">
              Supporting peaceful protest in Austin, TX
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground hover:underline transition-colors">
              About
            </Link>
            <Link href="/resources" className="hover:text-foreground hover:underline transition-colors">
              Resources
            </Link>
            <Link href="/partner" className="hover:text-foreground hover:underline transition-colors">
              Partner
            </Link>
            <Link href="/privacy" className="hover:text-foreground hover:underline transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground hover:underline transition-colors">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
