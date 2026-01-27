import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ExternalLink,
  Eye,
  HandHelping,
  Heart,
  Megaphone,
  Phone,
  Truck,
  Users,
} from 'lucide-react';

export const metadata = {
  title: 'Volunteer | ATX Protests',
  description: 'Sign up to volunteer and help organize protests in Austin, Texas.',
};

// Replace this with your actual Google Form URL
const GOOGLE_FORM_URL = 'https://forms.google.com/your-form-id';

const volunteerRoles = [
  {
    icon: Eye,
    title: 'Legal Observer',
    description:
      'Document police activity and protect protesters\' rights. Training provided by the National Lawyers Guild.',
    commitment: '4-6 hours per event',
    requirements: ['No legal background needed', 'Must complete training'],
  },
  {
    icon: Heart,
    title: 'Street Medic',
    description:
      'Provide first aid and basic medical support to protesters. Essential for larger events.',
    commitment: '4-6 hours per event',
    requirements: ['First aid certification preferred', 'Training available'],
  },
  {
    icon: Phone,
    title: 'Communications',
    description:
      'Help with social media, updates, and keeping protesters informed during events.',
    commitment: '2-4 hours per week',
    requirements: ['Social media experience helpful', 'Reliable phone/internet'],
  },
  {
    icon: Truck,
    title: 'Logistics',
    description:
      'Help with setup, supplies distribution, and coordination before and during events.',
    commitment: '3-5 hours per event',
    requirements: ['Vehicle access helpful', 'Able to lift supplies'],
  },
  {
    icon: Megaphone,
    title: 'Outreach',
    description:
      'Spread the word about upcoming events and recruit new participants and volunteers.',
    commitment: '2-4 hours per week',
    requirements: ['Good communication skills', 'Community connections helpful'],
  },
  {
    icon: Users,
    title: 'General Support',
    description:
      'Help where needed - from handing out water to greeting new protesters and answering questions.',
    commitment: 'Flexible',
    requirements: ['No experience needed', 'Positive attitude'],
  },
];

export default function VolunteerPage() {
  return (
    <div className="flex flex-col gap-6" data-testid="volunteer-page">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary/20">
          <HandHelping className="h-6 w-6 text-secondary-foreground" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Volunteer</h1>
          <p className="text-muted-foreground">
            Help make a difference in your community
          </p>
        </div>
      </div>

      {/* Introduction */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="py-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold mb-2">
              Your Help Makes a Difference
            </h2>
            <p className="text-muted-foreground mb-6">
              Volunteers are the backbone of every successful protest. Whether
              you have a few hours or want to take on a larger role, there&apos;s
              a place for you. All volunteers require admin approval before
              participating.
            </p>
            <Button asChild size="lg">
              <a
                href={GOOGLE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Sign Up to Volunteer
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Volunteer Roles */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Volunteer Opportunities</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {volunteerRoles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.title}
                className="flex flex-col"
                data-testid={`volunteer-role-${role.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon className="h-5 w-5 text-primary" />
                    {role.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-muted-foreground mb-4">
                    {role.description}
                  </p>
                  <div className="mt-auto space-y-2 text-sm">
                    <p>
                      <span className="font-medium">Time commitment:</span>{' '}
                      {role.commitment}
                    </p>
                    <div>
                      <span className="font-medium">Requirements:</span>
                      <ul className="list-disc list-inside text-muted-foreground">
                        {role.requirements.map((req) => (
                          <li key={req}>{req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* What to Expect */}
      <section>
        <h2 className="text-xl font-semibold mb-4">What to Expect</h2>
        <Card>
          <CardContent className="py-6">
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  1
                </span>
                <div>
                  <h3 className="font-medium">Submit Your Application</h3>
                  <p className="text-sm text-muted-foreground">
                    Fill out our volunteer form with your information and
                    interests.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  2
                </span>
                <div>
                  <h3 className="font-medium">Admin Review</h3>
                  <p className="text-sm text-muted-foreground">
                    Our team will review your application and reach out within a
                    few days.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  3
                </span>
                <div>
                  <h3 className="font-medium">Training & Onboarding</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete any required training for your chosen role.
                  </p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm">
                  4
                </span>
                <div>
                  <h3 className="font-medium">Start Helping</h3>
                  <p className="text-sm text-muted-foreground">
                    Join events and make a real difference in your community!
                  </p>
                </div>
              </li>
            </ol>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="text-center py-8 bg-muted/50 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">Ready to Help?</h2>
        <p className="text-muted-foreground mb-6">
          Sign up today and be part of positive change in Austin.
        </p>
        <Button asChild size="lg">
          <a href={GOOGLE_FORM_URL} target="_blank" rel="noopener noreferrer">
            <HandHelping className="mr-2 h-4 w-4" />
            Become a Volunteer
          </a>
        </Button>
      </section>
    </div>
  );
}
