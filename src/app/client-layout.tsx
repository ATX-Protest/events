'use client';

import { AppSidebar } from '@/components/app-sidebar';
import Header from '@/components/header';
import { MobileNav } from '@/components/layouts/mobile-nav';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';

interface ClientLayoutProps {
  children: React.ReactNode;
  isSignedIn: boolean;
}

export default function ClientLayout({ children, isSignedIn: _isSignedIn }: ClientLayoutProps) {
  const pathname = usePathname();

  // Only hide layout on sign-in page
  // For MVP, we show the layout for all public routes
  const hideLayout = pathname.startsWith('/sign-in');

  return hideLayout ? (
    children
  ) : (
    <SidebarProvider>
      <Header />
      <AppSidebar />
      <SidebarInset>
        <main className="w-full max-w-[1920px] mx-auto p-4 md:p-6 pb-20 md:pb-6">
          {children}
        </main>
      </SidebarInset>
      <MobileNav />
    </SidebarProvider>
  );
}
