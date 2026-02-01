'use client';

import { cn } from '@/lib/utils';
import { Menu, Megaphone, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/events', label: 'Events' },
  { href: '/resources', label: 'Resources' },
  { href: '/get-alerts', label: 'Get Alerts' },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background"
      data-testid="header"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
              <Megaphone className="h-5 w-5 text-primary-foreground" aria-hidden="true" />
            </div>
            <Link href="/" className="flex items-center" data-testid="header-logo">
              <span className="text-xl font-bold">ATX</span>
              <span className="text-xl font-bold text-primary ml-1">Protests</span>
              <span className="ml-2 text-xs font-medium text-muted-foreground">(Coming Soon)</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6" data-testid="desktop-nav">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  )}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 -mr-2 touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            data-testid="mobile-menu-button"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden border-t bg-background"
          data-testid="mobile-menu"
        >
          <nav className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'text-base font-medium py-2 transition-colors hover:text-primary',
                      isActive ? 'text-primary' : 'text-foreground'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
