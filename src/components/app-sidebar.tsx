'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar';
import {
  BookOpen,
  HandHelping,
  HelpCircle,
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
    tooltip: 'Home',
  },
  {
    href: '/protests',
    icon: Megaphone,
    label: 'Protests',
    tooltip: 'Browse Protests',
  },
  {
    href: '/resources',
    icon: BookOpen,
    label: 'Resources',
    tooltip: 'Safety & Legal Resources',
  },
  {
    href: '/updates',
    icon: Newspaper,
    label: 'Updates',
    tooltip: 'News & Updates',
  },
  {
    href: '/how-it-works',
    icon: HelpCircle,
    label: 'How It Works',
    tooltip: 'Learn How It Works',
  },
  {
    href: '/volunteer',
    icon: HandHelping,
    label: 'Volunteer',
    tooltip: 'Volunteer Opportunities',
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" data-testid="app-sidebar">
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href);

              return (
                <SidebarMenuButton
                  key={item.href}
                  asChild
                  isActive={isActive}
                  tooltip={item.tooltip}
                  data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <Link href={item.href}>
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              );
            })}
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
