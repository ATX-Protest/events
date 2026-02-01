import { OrganizationJsonLd, WebSiteJsonLd } from '@/components/seo/json-ld';
import { MyThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import type React from 'react';
import ClientLayout from './client-layout';
import './globals.css';

const GTM_ID = 'GTM-5KMKJDJ4';
// GA (G-3N10F823C3) is managed through GTM - configure in GTM dashboard

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
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
        </Script>
        <OrganizationJsonLd baseUrl={baseUrl} />
        <WebSiteJsonLd baseUrl={baseUrl} />
      </head>
      <body className={inter.className}>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <MyThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <ClientLayout isSignedIn={isSignedIn}>{children}</ClientLayout>
          <Toaster />
        </MyThemeProvider>
      </body>
    </html>
  );
}
