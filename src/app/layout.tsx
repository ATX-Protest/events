import { MyThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import type React from 'react';
import ClientLayout from './client-layout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'ATX Protests',
  description: 'Organize and participate in Austin, TX protests. Find upcoming events, know your rights, and stay safe.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // MVP: No auth - all users treated as signed out
  const isSignedIn = false;

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <MyThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClientLayout isSignedIn={isSignedIn}>{children}</ClientLayout>
          <Toaster />
        </MyThemeProvider>
      </body>
    </html>
  );
}
