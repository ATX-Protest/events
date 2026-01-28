import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Get Alerts - Protest & Volunteer Notifications',
  description:
    'Subscribe to alerts about Austin protests and volunteer opportunities. Choose SMS, email, or Signal notifications for weekly digests, rapid response alerts, and more.',
  openGraph: {
    title: 'Get Alerts | ATX Protests',
    description:
      'Stay informed about Austin protests and volunteer opportunities via SMS, email, or Signal notifications.',
  },
  alternates: {
    canonical: '/get-alerts',
  },
};

export default function GetAlertsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
