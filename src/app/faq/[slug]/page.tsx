import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FAQPageJsonLd,
} from '@/components/seo/json-ld';
import { Button } from '@/components/ui/button';
import { getAllFAQArticles, getFAQArticleBySlug } from '@/data/faq-articles';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, Scale, Shield, ClipboardList, Gavel } from 'lucide-react';

const baseUrl = process.env['NEXT_PUBLIC_APP_URL'] || 'https://atxprotests.com';

interface FAQArticlePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  const articles = getAllFAQArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: FAQArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getFAQArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    openGraph: {
      title: `${article.title} | ATX Protests`,
      description: article.description,
      type: 'article',
      url: `${baseUrl}/faq/${article.slug}`,
    },
    alternates: {
      canonical: `${baseUrl}/faq/${article.slug}`,
    },
  };
}

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

export default async function FAQArticlePage({ params }: FAQArticlePageProps) {
  const { slug } = await params;
  const article = getFAQArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const breadcrumbs = [
    { name: 'Home', url: baseUrl },
    { name: 'Resources & FAQ', url: `${baseUrl}/faq` },
    { name: article.title, url: `${baseUrl}/faq/${article.slug}` },
  ];

  // Simple markdown to HTML conversion for basic formatting
  const renderContent = (content: string) => {
    const lines = content.trim().split('\n');
    const elements: React.ReactNode[] = [];
    let currentList: string[] = [];

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${elements.length}`} className="list-disc pl-6 space-y-2 mb-4">
            {currentList.map((item, i) => (
              <li key={i} className="text-muted-foreground">
                {item}
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    const numberedListRegex = /^\d+\./;

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      if (trimmed.startsWith('## ')) {
        flushList();
        elements.push(
          <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
            {trimmed.replace('## ', '')}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushList();
        elements.push(
          <h3 key={index} className="text-xl font-semibold mt-6 mb-3">
            {trimmed.replace('### ', '')}
          </h3>
        );
      } else if (trimmed.startsWith('- **')) {
        const listContent = trimmed
          .replace('- **', '')
          .replace('**', ': ')
          .replace(/\*\*/g, '');
        currentList.push(listContent);
      } else if (trimmed.startsWith('- ')) {
        currentList.push(trimmed.replace('- ', ''));
      } else if (numberedListRegex.exec(trimmed)) {
        currentList.push(trimmed.replace(/^\d+\.\s*/, ''));
      } else if (trimmed === '') {
        flushList();
      } else if (trimmed.startsWith('**') && trimmed.endsWith('**')) {
        flushList();
        elements.push(
          <p key={index} className="font-semibold mt-4 mb-2">
            {trimmed.replace(/\*\*/g, '')}
          </p>
        );
      } else if (trimmed) {
        flushList();
        // Handle inline bold
        const parts = trimmed.split(/(\*\*[^*]+\*\*)/g);
        elements.push(
          <p key={index} className="text-muted-foreground mb-4">
            {parts.map((part, i) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return (
                  <strong key={i} className="font-semibold text-foreground">
                    {part.replace(/\*\*/g, '')}
                  </strong>
                );
              }
              return part;
            })}
          </p>
        );
      }
    });

    flushList();
    return elements;
  };

  return (
    <>
      <ArticleJsonLd
        title={article.title}
        description={article.description}
        url={`${baseUrl}/faq/${article.slug}`}
        datePublished={article.createdAt}
        dateModified={article.updatedAt}
      />
      <FAQPageJsonLd faqs={article.faqs} />
      <BreadcrumbJsonLd items={breadcrumbs} />

      <article className="flex flex-col gap-8" data-testid="faq-article-page">
        {/* Back link */}
        <div>
          <Button variant="ghost" size="sm" asChild className="-ml-2">
            <Link href="/faq">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Back to Resources
            </Link>
          </Button>
        </div>

        {/* Header */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-primary">
            {categoryIcons[article.category]}
            <span className="text-sm font-medium uppercase tracking-wider">
              {categoryLabels[article.category]}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">{article.title}</h1>
          <p className="text-lg text-muted-foreground">{article.description}</p>
        </header>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {renderContent(article.content)}
        </div>

        {/* FAQ Section */}
        <section className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {article.faqs.map((faq, index) => (
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
                <div className="px-4 pb-4 text-muted-foreground">{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>

        {/* Related Articles */}
        <section className="bg-muted/50 rounded-lg p-6 md:p-8">
          <h2 className="text-xl font-bold mb-4">Related Resources</h2>
          <div className="flex flex-wrap gap-3">
            {getAllFAQArticles()
              .filter((a) => a.slug !== article.slug)
              .slice(0, 3)
              .map((related) => (
                <Button key={related.slug} variant="outline" asChild>
                  <Link href={`/faq/${related.slug}`}>{related.title}</Link>
                </Button>
              ))}
          </div>
        </section>

        {/* CTA */}
        <section className="text-center py-4">
          <p className="text-muted-foreground mb-4">
            Have questions about a specific event?
          </p>
          <div className="flex gap-3 justify-center">
            <Button asChild>
              <Link href="/">Find Events</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/get-alerts">Get Alerts</Link>
            </Button>
          </div>
        </section>
      </article>
    </>
  );
}
