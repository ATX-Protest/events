import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  Calendar,
  CheckCircle,
  HandHelping,
  HelpCircle,
  Megaphone,
  Shield,
  Users,
} from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'How It Works | ATX Protests',
  description: 'Learn how to use ATX Protests to find and participate in peaceful protests in Austin, Texas.',
};

const steps = [
  {
    icon: Calendar,
    title: 'Find an Event',
    description:
      'Browse our list of upcoming protests and events in Austin. Each listing includes date, time, location, and what to expect.',
  },
  {
    icon: BookOpen,
    title: 'Know Your Rights',
    description:
      'Before attending, review our resources on your constitutional rights while protesting. Knowledge is your best protection.',
  },
  {
    icon: Shield,
    title: 'Prepare Safely',
    description:
      'Check our safety checklist for what to bring, what to wear, and how to stay safe during the event.',
  },
  {
    icon: Users,
    title: 'Attend & Participate',
    description:
      'Join the event, stay with your group, and exercise your First Amendment rights peacefully and responsibly.',
  },
];

const faqs = [
  {
    question: 'Do I need to register to attend a protest?',
    answer:
      'No registration is required to attend any public protest. You can simply show up at the designated time and location. However, signing up as a volunteer helps organizers plan better.',
  },
  {
    question: 'What should I bring to a protest?',
    answer:
      'Essential items include water, comfortable shoes, sunscreen, a phone (fully charged), ID, cash, and weather-appropriate clothing. Check our Resources page for a complete checklist.',
  },
  {
    question: 'Is it legal to photograph police?',
    answer:
      'Yes, you have the constitutional right to photograph and record police officers in public spaces. However, maintain a safe distance and do not interfere with their duties.',
  },
  {
    question: 'What if I get arrested?',
    answer:
      'Stay calm, do not resist, and clearly state that you wish to remain silent and want a lawyer. Our Resources section has detailed information about your rights if arrested.',
  },
  {
    question: 'How can I volunteer?',
    answer:
      'Click the Volunteer link in the navigation to access our volunteer signup form. Opportunities include legal observing, communications, logistics, and general support.',
  },
];

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col gap-8" data-testid="how-it-works-page">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <HelpCircle className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">How It Works</h1>
          <p className="text-muted-foreground">
            Your guide to safely participating in Austin protests
          </p>
        </div>
      </div>

      {/* Introduction */}
      <section className="prose prose-gray max-w-none">
        <p className="text-lg text-muted-foreground">
          ATX Protests is your community hub for organizing and participating in
          peaceful protests in Austin, Texas. We provide information about
          upcoming events, essential safety resources, and volunteer
          opportunities to help you exercise your constitutional rights safely
          and effectively.
        </p>
      </section>

      {/* Steps */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Getting Started</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={step.title} className="relative">
                <div className="absolute -top-3 -left-3 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  {index + 1}
                </div>
                <CardHeader className="pt-6">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="h-5 w-5 text-primary" />
                    {step.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{step.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Key Features */}
      <section>
        <h2 className="text-xl font-semibold mb-6">What We Offer</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Megaphone className="h-5 w-5 text-primary" />
                Event Listings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Browse upcoming protests with details on time, location,
                organizers, and what to expect.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <BookOpen className="h-5 w-5 text-primary" />
                Know Your Rights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Comprehensive guides on your First Amendment rights and what to
                do in various situations.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-5 w-5 text-accent" />
                Safety Resources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Essential safety information, supply checklists, and emergency
                contacts.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <HandHelping className="h-5 w-5 text-secondary" />
                Volunteer Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Sign up to help as a legal observer, medic, communications
                support, or general volunteer.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <CheckCircle className="h-5 w-5 text-primary" />
                Updates & Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Stay informed with the latest news, event updates, and important
                announcements.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FAQs */}
      <section>
        <h2 className="text-xl font-semibold mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.question}>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">
                  {faq.question}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-8 bg-muted/50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Ready to Get Involved?</h2>
        <p className="text-muted-foreground mb-6">
          Start by browsing upcoming events or reviewing our safety resources.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/protests">
              <Calendar className="mr-2 h-4 w-4" />
              View Protests
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/resources">
              <BookOpen className="mr-2 h-4 w-4" />
              Read Resources
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
