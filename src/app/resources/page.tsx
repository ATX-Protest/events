import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/seo/json-ld';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllFAQArticles } from '@/data/resources';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Scale, Shield, ClipboardList, Gavel } from 'lucide-react';

const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] || 'https://atxprotests.com';

export const metadata: Metadata = {
  title: 'Protest Resources & FAQ - Know Your Rights in Austin TX',
  description:
    'Essential resources for protesters in Austin, Texas. Know your rights, prepare for protests, stay safe, and find legal support. Free guides and FAQs.',
  openGraph: {
    title: 'Protest Resources & FAQ | ATX Protests',
    description:
      'Essential resources for protesters in Austin. Know your rights, stay safe, and find legal support.',
  },
  alternates: {
    canonical: `${baseUrl}/resources`,
  },
};

const categoryIcons: Record<string, React.ReactNode> = {
  rights: <Scale className="h-5 w-5" />,
  safety: <Shield className="h-5 w-5" />,
  preparation: <ClipboardList className="h-5 w-5" />,
  legal: <Gavel className="h-5 w-5" />,
};

const categoryLabels: Record<string, string> = {
  rights: 'Know Your Rights',
  safety: 'Safety',
  preparation: 'Preparation',
  legal: 'Legal Support',
};

export default function FAQPage() {
  const articles = getAllFAQArticles();

  // Collect all FAQs for schema markup
  const allFaqs = articles.flatMap((article) => article.faqs);

  const breadcrumbs = [
    { name: 'Home', url: baseUrl },
    { name: 'Resources', url: `${baseUrl}/resources` },
  ];

  return (
    <>
      <FAQPageJsonLd faqs={allFaqs} />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="flex flex-col gap-8" data-testid="resources-page">
        <header className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">
            Protest Resources & FAQ
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Essential guides for protesters in Austin, Texas. Know your rights,
            prepare for demonstrations, stay safe, and find legal support when you
            need it.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          {articles.map((article) => (
            <Card
              key={article.slug}
              className="hover:shadow-md transition-shadow"
            >
              <Link href={`/resources/${article.slug}`}>
                <CardHeader>
                  <div className="flex items-center gap-2 text-primary mb-2">
                    {categoryIcons[article.category]}
                    <span className="text-xs font-medium uppercase tracking-wider">
                      {categoryLabels[article.category]}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{article.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{article.description}</p>
                  <p className="text-sm text-primary mt-4 font-medium">
                    Read guide &rarr;
                  </p>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>

        {/* Quick FAQ Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {allFaqs.slice(0, 6).map((faq, index) => (
              <details
                key={index}
                className="group border rounded-lg"
                data-testid={`faq-item-${index}`}
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 font-medium">
                  {faq.question}
                  <span className="ml-2 transition-transform group-open:rotate-180">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-4 pb-4 text-muted-foreground">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-muted/50 rounded-lg p-6 md:p-8 text-center mt-4">
          <h2 className="text-xl font-bold mb-2">Need More Help?</h2>
          <p className="text-muted-foreground mb-4">
            Contact local legal resources or reach out to protest organizers for
            event-specific information.
          </p>
          <div className="flex flex-wrap gap-3 justify-center text-sm">
            <a
              href="https://www.aclutx.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              ACLU of Texas
            </a>
            <span className="text-muted-foreground">|</span>
            <a
              href="https://www.nlg.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              National Lawyers Guild
            </a>
            <span className="text-muted-foreground">|</span>
            <a
              href="https://texascivilrightsproject.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Texas Civil Rights Project
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
