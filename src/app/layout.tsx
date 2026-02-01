import {
  GoogleTagManager,
  GoogleTagManagerNoScript,
} from '@/components/analytics/gtm';
import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/json-ld';
import { MyThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import type React from 'react';
import ClientLayout from './client-layout';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] || 'https://atxprotests.com';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'Austin Protests & Rallies - Upcoming Events | ATX Protests',
    template: '%s | ATX Protests',
  },
  description:
    'Find upcoming protests and rallies in Austin, TX. Your Austin protest calendar for marches, rallies, and civic actions. Know your rights and stay safe.',
  keywords: [
    'austin protests',
    'atx protests',
    'protests in austin this weekend',
    'upcoming rallies austin tx',
    'austin protest calendar',
    'austin demonstrations',
    'austin marches',
    'texas protests',
  ],
  authors: [{ name: 'ATX Protests' }],
  creator: 'ATX Protests',
  publisher: 'ATX Protests',
  // TODO: Change to index: true, follow: true when ready to launch
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'ATX Protests',
    title: 'Austin Protests & Rallies - Upcoming Events | ATX Protests',
    description:
      'Find upcoming protests and rallies in Austin, TX. Your Austin protest calendar for marches, rallies, and civic actions.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ATX Protests - Find Upcoming Protests in Austin, TX',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Austin Protests & Rallies - Upcoming Events | ATX Protests',
    description:
      'Find upcoming protests and rallies in Austin, TX. Your protest calendar for marches and civic actions.',
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: baseUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // MVP: No auth - all users treated as signed out
  const isSignedIn = false;

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleTagManager />
        <OrganizationJsonLd baseUrl={baseUrl} />
        <WebSiteJsonLd baseUrl={baseUrl} />
      </head>
      <body className={inter.className}>
        <GoogleTagManagerNoScript />
        <MyThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClientLayout isSignedIn={isSignedIn}>{children}</ClientLayout>
          <Toaster />
        </MyThemeProvider>
      </body>
    </html>
  );
}
