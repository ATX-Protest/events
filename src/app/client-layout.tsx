'use client';

import { Footer } from '@/components/footer';
import Header from '@/components/header';
import { usePathname } from 'next/navigation';

interface ClientLayoutProps {
  children: React.ReactNode;
  isSignedIn: boolean;
}

export default function ClientLayout({ children, isSignedIn: _isSignedIn }: ClientLayoutProps) {
  const pathname = usePathname();

  // Only hide layout on sign-in page
  const hideLayout = pathname.startsWith('/sign-in');

  return hideLayout ? (
    <>{children}</>
  ) : (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-6 md:px-6 md:py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}
