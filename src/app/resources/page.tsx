import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/seo/json-ld';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { getAllFAQArticles } from '@/data/resources';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Scale,
  Shield,
  ClipboardList,
  Gavel,
  ChevronRight,
  BookOpen,
  ChevronDown,
  ExternalLink,
} from 'lucide-react';

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

const categoryConfig: Record<string, { icon: React.ReactNode; label: string; color: string }> = {
  rights: {
    icon: <Scale className="h-5 w-5" aria-hidden="true" />,
    label: 'Know Your Rights',
    color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  },
  safety: {
    icon: <Shield className="h-5 w-5" aria-hidden="true" />,
    label: 'Safety',
    color: 'bg-green-500/10 text-green-600 dark:text-green-400',
  },
  preparation: {
    icon: <ClipboardList className="h-5 w-5" aria-hidden="true" />,
    label: 'Preparation',
    color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
  legal: {
    icon: <Gavel className="h-5 w-5" aria-hidden="true" />,
    label: 'Legal Support',
    color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
  },
};

export default function ResourcesPage() {
  const articles = getAllFAQArticles();
  const allFaqs = articles.flatMap((article) => article.faqs);

  const breadcrumbs = [
    { name: 'Home', url: baseUrl },
    { name: 'Resources', url: `${baseUrl}/resources` },
  ];

  return (
    <>
      <FAQPageJsonLd faqs={allFaqs} />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="flex flex-col gap-8 md:gap-12" data-testid="resources-page">
        {/* Hero Section */}
        <section className="relative py-6 md:py-10 hero-gradient -mx-4 px-4 md:-mx-6 md:px-6" data-testid="resources-hero">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-2xl bg-primary mb-4 shadow-lg" data-testid="resources-hero-icon">
              <BookOpen className="h-7 w-7 text-primary-foreground" aria-hidden="true" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-balance tracking-tight" data-testid="resources-hero-title">
              Protest Resources &{' '}
              <span className="text-gradient">Know Your Rights</span>
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto text-pretty" data-testid="resources-hero-description">
              Essential guides for protesters in Austin, Texas. Stay informed,
              stay prepared, and know your rights.
            </p>
          </div>
        </section>

        {/* Resource Cards */}
        <section data-testid="resources-guides">
          <h2 className="text-xl font-semibold mb-5" data-testid="resources-guides-title">Guides & Resources</h2>
          <div className="grid gap-4 sm:grid-cols-2" data-testid="resources-guides-grid">
            {articles.map((article, index) => {
              const config = categoryConfig[article.category] ?? {
                icon: <BookOpen className="h-5 w-5" aria-hidden="true" />,
                label: article.category,
                color: 'bg-muted text-muted-foreground',
              };

              return (
                <Link
                  key={article.slug}
                  href={`/resources/${article.slug}`}
                  className="group animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                  data-testid={`resource-card-${article.slug}`}
                >
                  <Card className="h-full card-hover overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-3">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${config.color} flex-shrink-0`} data-testid={`resource-icon-${article.slug}`}>
                          {config.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`inline-block text-xs font-medium uppercase tracking-wider mb-1 ${config.color.split(' ').slice(1).join(' ')}`} data-testid={`resource-category-${article.slug}`}>
                            {config.label}
                          </span>
                          <h3 className="font-semibold text-lg group-hover:text-primary transition-colors line-clamp-2" data-testid={`resource-title-${article.slug}`}>
                            {article.title}
                          </h3>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3" data-testid={`resource-description-${article.slug}`}>
                        {article.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-primary" data-testid={`resource-link-${article.slug}`}>
                        Read guide
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Quick FAQ Section */}
        <section className="animate-fade-in stagger-2" data-testid="resources-faq">
          <h2 className="text-xl font-semibold mb-5" data-testid="resources-faq-title">Frequently Asked Questions</h2>
          <div className="space-y-2" data-testid="resources-faq-list">
            {allFaqs.slice(0, 6).map((faq, index) => (
              <details
                key={index}
                className="group rounded-lg border bg-card overflow-hidden"
                data-testid={`faq-item-${index}`}
              >
                <summary className="flex cursor-pointer items-center justify-between p-4 font-medium hover:bg-muted/50 transition-colors touch-action-manipulation" data-testid={`faq-question-${index}`}>
                  <span className="pr-4 text-sm sm:text-base">{faq.question}</span>
                  <ChevronDown
                    className="h-5 w-5 text-muted-foreground transition-transform group-open:rotate-180 flex-shrink-0"
                    aria-hidden="true"
                  />
                </summary>
                <div className="px-4 pb-4 text-sm text-muted-foreground leading-relaxed border-t bg-muted/30" data-testid={`faq-answer-${index}`}>
                  <div className="pt-4">
                    {faq.answer}
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* External Resources CTA */}
        <section className="animate-fade-in stagger-3" data-testid="resources-cta">
          <div className="rounded-xl bg-secondary text-secondary-foreground p-6 md:p-8" data-testid="resources-cta-card">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-3" data-testid="resources-cta-title">Need More Help?</h2>
              <p className="text-secondary-foreground/80 text-sm mb-6" data-testid="resources-cta-description">
                Contact local legal resources or reach out to protest organizers for
                event-specific information.
              </p>
              <div className="flex flex-wrap justify-center gap-3" data-testid="resources-external-links">
                {[
                  { name: 'ACLU of Texas', url: 'https://www.aclutx.org/', id: 'aclu' },
                  { name: 'National Lawyers Guild', url: 'https://www.nlg.org/', id: 'nlg' },
                  { name: 'Texas Civil Rights Project', url: 'https://texascivilrightsproject.org/', id: 'tcrp' },
                ].map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary-foreground/10 text-secondary-foreground text-sm font-medium hover:bg-secondary-foreground/20 transition-colors touch-action-manipulation"
                    data-testid={`external-link-${link.id}`}
                  >
                    {link.name}
                    <ExternalLink className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
