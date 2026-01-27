'use client';

import { cn } from '@/lib/utils';
import {
  BookOpen,
  HandHelping,
  Home,
  Megaphone,
  Newspaper,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  {
    href: '/',
    icon: Home,
    label: 'Home',
  },
  {
    href: '/protests',
    icon: Megaphone,
    label: 'Protests',
  },
  {
    href: '/resources',
    icon: BookOpen,
    label: 'Resources',
  },
  {
    href: '/updates',
    icon: Newspaper,
    label: 'Updates',
  },
  {
    href: '/volunteer',
    icon: HandHelping,
    label: 'Volunteer',
  },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden"
      data-testid="mobile-nav"
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 h-full px-2 py-1 transition-colors',
                'min-w-[64px] touch-manipulation',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
              data-testid={`mobile-nav-${item.label.toLowerCase()}`}
            >
              <Icon
                className={cn('h-5 w-5 mb-1', isActive && 'text-primary')}
              />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
      {/* Safe area padding for devices with home indicator */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}
