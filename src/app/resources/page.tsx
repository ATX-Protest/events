'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllResourcesSorted, resources } from '@/data/resources';
import type { ResourceCategory } from '@/data/types';
import {
  AlertTriangle,
  Backpack,
  BookOpen,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Gavel,
  Heart,
  Phone,
  Shield,
} from 'lucide-react';
import { useState } from 'react';

const categoryConfig: Record<
  ResourceCategory,
  { label: string; icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  'know-your-rights': {
    label: 'Know Your Rights',
    icon: Gavel,
    color: 'text-primary',
  },
  safety: {
    label: 'Safety',
    icon: Shield,
    color: 'text-accent',
  },
  legal: {
    label: 'Legal Support',
    icon: BookOpen,
    color: 'text-secondary',
  },
  emergency: {
    label: 'Emergency',
    icon: Phone,
    color: 'text-destructive',
  },
  supplies: {
    label: 'Supplies',
    icon: Backpack,
    color: 'text-primary',
  },
  'mental-health': {
    label: 'Mental Health',
    icon: Heart,
    color: 'text-pink-500',
  },
};

function ResourceCard({ resource }: { resource: (typeof resources)[0] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = categoryConfig[resource.category];
  const Icon = config.icon;

  return (
    <Card
      className="flex flex-col"
      data-testid={`resource-card-${resource.id}`}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <Badge variant="outline" className="mb-2">
            <Icon className={`h-3 w-3 mr-1 ${config.color}`} />
            {config.label}
          </Badge>
        </div>
        <CardTitle className="text-lg">{resource.title}</CardTitle>
        <p className="text-sm text-muted-foreground">{resource.description}</p>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div
          className={`prose prose-sm prose-gray max-w-none ${
            isExpanded ? '' : 'line-clamp-6'
          }`}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: resource.content
                .replace(/^## /gm, '<h2 class="text-base font-semibold mt-4 mb-2">')
                .replace(/^### /gm, '<h3 class="text-sm font-semibold mt-3 mb-1">')
                .replace(/\n- /g, '\n<li class="ml-4">')
                .replace(/\n\d+\. /g, '\n<li class="ml-4">')
                .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
                .replace(/\n\n/g, '</p><p class="mt-2">')
                .replace(/^\s+/, '<p>')
                .replace(/\s+$/, '</p>'),
            }}
          />
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="mt-4 self-start"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <ChevronUp className="mr-1 h-4 w-4" />
              Show Less
            </>
          ) : (
            <>
              <ChevronDown className="mr-1 h-4 w-4" />
              Read More
            </>
          )}
        </Button>

        {resource.externalLinks && resource.externalLinks.length > 0 && (
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm font-medium mb-2">External Resources</p>
            <div className="flex flex-wrap gap-2">
              {resource.externalLinks.map((link) => (
                <Button
                  key={link.url}
                  asChild
                  variant="outline"
                  size="sm"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-1 h-3 w-3" />
                    {link.label}
                  </a>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export default function ResourcesPage() {
  const sortedResources = getAllResourcesSorted();
  const [activeCategory, setActiveCategory] = useState<ResourceCategory | 'all'>(
    'all'
  );

  const filteredResources =
    activeCategory === 'all'
      ? sortedResources
      : sortedResources.filter((r) => r.category === activeCategory);

  const categories = Object.keys(categoryConfig) as ResourceCategory[];

  return (
    <div className="flex flex-col gap-6" data-testid="resources-page">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10">
          <Shield className="h-6 w-6 text-accent" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Resources</h1>
          <p className="text-muted-foreground">
            Know your rights, stay safe, and get support
          </p>
        </div>
      </div>

      {/* Emergency banner */}
      <Card className="border-destructive/50 bg-destructive/5">
        <CardContent className="py-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
            <div className="flex-1">
              <p className="font-medium">Emergency Contacts</p>
              <p className="text-sm text-muted-foreground">
                911 for emergencies • Texas Civil Rights Project: (512) 474-5073
                • ACLU of Texas: (713) 942-8146
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeCategory === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveCategory('all')}
        >
          All
        </Button>
        {categories.map((cat) => {
          const config = categoryConfig[cat];
          const Icon = config.icon;
          return (
            <Button
              key={cat}
              variant={activeCategory === cat ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveCategory(cat)}
            >
              <Icon className="mr-1 h-4 w-4" />
              {config.label}
            </Button>
          );
        })}
      </div>

      {/* Resources grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {filteredResources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>

      {filteredResources.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-medium">No resources found</h2>
          <p className="text-muted-foreground">
            Try selecting a different category.
          </p>
        </div>
      )}
    </div>
  );
}
