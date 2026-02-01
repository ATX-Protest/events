'use client';

import { cn } from '@/lib/utils';
import { Menu, Megaphone, X, Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navItems = [
  { href: '/', label: 'Events' },
  { href: '/resources', label: 'Resources' },
  { href: '/get-alerts', label: 'Get Alerts', highlight: true },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80"
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group"
            data-testid="header-logo"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary shadow-sm transition-transform group-hover:scale-105" data-testid="header-logo-icon">
              <Megaphone className="h-4.5 w-4.5 text-primary-foreground" aria-hidden="true" />
            </div>
            <div className="flex items-baseline gap-1" data-testid="header-logo-text">
              <span className="text-xl font-bold tracking-tight font-display">ATX</span>
              <span className="text-xl font-bold tracking-tight text-primary font-display">Protests</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1" data-testid="desktop-nav">
            {navItems.map((item) => {
              const isActive = item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

              if (item.highlight) {
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all',
                      'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground',
                      isActive && 'bg-primary text-primary-foreground'
                    )}
                    data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <Bell className="h-3.5 w-3.5" aria-hidden="true" />
                    {item.label}
                  </Link>
                );
              }

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
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
            className="md:hidden flex items-center justify-center h-10 w-10 rounded-lg hover:bg-muted transition-colors touch-action-manipulation focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            data-testid="mobile-menu-button"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          'md:hidden border-t bg-background overflow-hidden transition-all duration-200 ease-out',
          mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        )}
        data-testid="mobile-menu"
        aria-hidden={!mobileMenuOpen}
      >
        <nav className="max-w-7xl mx-auto px-4 md:px-6 py-3">
          <div className="flex flex-col gap-1">
            {navItems.map((item) => {
              const isActive = item.href === '/'
                ? pathname === '/'
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 rounded-lg text-base font-medium transition-colors touch-action-manipulation',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground hover:bg-muted',
                    item.highlight && !isActive && 'text-primary'
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  {item.highlight && <Bell className="h-4 w-4" aria-hidden="true" />}
                  {item.label}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
}
