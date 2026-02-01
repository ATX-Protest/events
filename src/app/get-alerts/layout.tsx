import type { Metadata } from 'next';

const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] || 'https://atxprotests.com';

export const metadata: Metadata = {
  title: 'Get Alerts - Privacy-First Protest Notifications',
  description:
    'Get alerts about Austin protests without sharing your email or phone number. Enable anonymous browser push notifications to stay informed about events and rapid response actions.',
  openGraph: {
    title: 'Get Alerts | ATX Protests',
    description:
      'Privacy-first alerts for Austin protests. Browser push notifications that never collect your personal information.',
  },
  alternates: {
    canonical: `${baseUrl}/get-alerts`,
  },
};

export default function GetAlertsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
