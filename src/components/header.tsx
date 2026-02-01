'use client';

import { cn } from '@/lib/utils';
import { Megaphone, Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'Events' },
  { href: '/resources', label: 'Resources' },
  { href: '/get-alerts', label: 'Get Alerts', highlight: true },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-[backdrop-filter]:bg-background/80"
      data-testid="header"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Desktop: single row with logo and nav */}
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

          {/* Desktop Navigation - inline with logo */}
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
        </div>

        {/* Mobile Navigation - always visible as second row */}
        <nav className="md:hidden flex items-center justify-center gap-1 pb-3 -mt-1" data-testid="mobile-nav">
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
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all touch-action-manipulation',
                    'bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground',
                    isActive && 'bg-primary text-primary-foreground'
                  )}
                  data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
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
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors touch-action-manipulation',
                  isActive
                    ? 'bg-muted text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                )}
                data-testid={`mobile-nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
