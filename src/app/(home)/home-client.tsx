'use client';

import { ShareButton } from '@/components/features/share';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Protest } from '@/db/schema';
import { CATEGORY_LABELS, PROTEST_CATEGORIES, type ProtestCategory } from '@/lib/categories';
import { protestToShareable } from '@/lib/share';
import { usePushNotifications } from '@/hooks/use-push-notifications';
import {
  Bell,
  Calendar as CalendarIcon,
  ChevronDown,
  ChevronRight,
  Clock,
  Filter,
  MapPin,
  Megaphone,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

interface HomePageClientProps {
  initialProtests: Protest[];
}

function formatTimeDisplay(time: string | null): string {
  if (!time) return '';
  const [hours, minutes] = time.split(':').map(Number);
  const h = hours ?? 0;
  const m = minutes ?? 0;
  const period = h >= 12 ? 'PM' : 'AM';
  const displayHour = h % 12 || 12;
  return `${displayHour}:${String(m).padStart(2, '0')} ${period}`;
}

function formatDateForInput(date: Date): string {
  return date.toISOString().split('T')[0]!;
}

function getDefaultStartDate(): string {
  return formatDateForInput(new Date());
}

function getDefaultEndDate(): string {
  const date = new Date();
  date.setMonth(date.getMonth() + 1);
  return formatDateForInput(date);
}

function parseCategoriesFromUrl(param: string | null): Set<ProtestCategory> {
  if (!param) return new Set();
  const categories = param.split(',').filter((c): c is ProtestCategory =>
    PROTEST_CATEGORIES.includes(c as ProtestCategory)
  );
  return new Set(categories);
}

function formatEventDate(dateStr: string): { weekday: string; monthDay: string; isToday: boolean } {
  // Parse date string as local timezone by adding T00:00:00 (without Z)
  // This prevents JS from treating "2025-01-31" as UTC midnight
  const date = new Date(dateStr + 'T00:00:00');
  const today = new Date();
  const isToday = date.getFullYear() === today.getFullYear() &&
    date.getMonth() === today.getMonth() &&
    date.getDate() === today.getDate();
  const weekday = date.toLocaleDateString('en-US', { weekday: 'short' });
  const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return { weekday, monthDay, isToday };
}

export function HomePageClient({ initialProtests }: HomePageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { state: pushState } = usePushNotifications();

  const [selectedCategories, setSelectedCategories] = useState<Set<ProtestCategory>>(() =>
    parseCategoriesFromUrl(searchParams.get('categories'))
  );
  const [startDate, setStartDate] = useState<string>(
    () => searchParams.get('from') ?? getDefaultStartDate()
  );
  const [endDate, setEndDate] = useState<string>(
    () => searchParams.get('to') ?? getDefaultEndDate()
  );
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updateUrl = useCallback((
    categories: Set<ProtestCategory>,
    from: string,
    to: string
  ) => {
    const params = new URLSearchParams();

    if (categories.size > 0) {
      params.set('categories', [...categories].join(','));
    }

    const defaultFrom = getDefaultStartDate();
    const defaultTo = getDefaultEndDate();

    if (from && from !== defaultFrom) {
      params.set('from', from);
    }
    if (to && to !== defaultTo) {
      params.set('to', to);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `?${queryString}` : '/';
    router.replace(newUrl, { scroll: false });
  }, [router]);

  useEffect(() => {
    updateUrl(selectedCategories, startDate, endDate);
  }, [selectedCategories, startDate, endDate, updateUrl]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleCategory = (category: ProtestCategory) => {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  };

  const clearFilters = () => {
    setSelectedCategories(new Set());
    setStartDate(getDefaultStartDate());
    setEndDate(getDefaultEndDate());
  };

  const hasActiveFilters = selectedCategories.size > 0;

  const filteredProtests = initialProtests.filter((protest) => {
    if (selectedCategories.size > 0 && !selectedCategories.has(protest.category)) {
      return false;
    }
    if (startDate && protest.date < startDate) {
      return false;
    }
    if (endDate && protest.date > endDate) {
      return false;
    }
    return true;
  });

  // Show category names if 1-3 selected, otherwise count
  const categoryButtonLabel = (() => {
    if (selectedCategories.size === 0) return 'All Categories';
    if (selectedCategories.size <= 3) {
      return [...selectedCategories].map(c => CATEGORY_LABELS[c]).join(', ');
    }
    return `${selectedCategories.size} Categories`;
  })();

  return (
    <div className="flex flex-col gap-6 md:gap-10" data-testid="home-page">
      {/* Hero Section */}
      <section className="relative py-6 md:py-10 hero-gradient -mx-4 px-4 md:-mx-6 md:px-6" data-testid="home-hero">
        <div className="max-w-3xl mx-auto text-center animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance tracking-tight" data-testid="home-hero-title">
            Find Upcoming Protests in{' '}
            <span className="text-gradient">Austin, TX</span>
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto text-pretty mb-6" data-testid="home-hero-description">
            Your community calendar for rallies, marches, and civic actions.
            Stay informed. Stay safe. Make your voice heard.
          </p>
          {/* Container maintains consistent height to avoid CLS */}
          <div className="h-[42px] flex items-center justify-center" data-testid="home-hero-cta-container">
            {pushState === 'subscribed' ? (
              <span
                className="inline-flex items-center gap-2 px-4 py-2 text-sm text-muted-foreground"
                data-testid="home-hero-alerts-enabled"
              >
                <Bell className="h-4 w-4" aria-hidden="true" />
                Alerts enabled
              </span>
            ) : pushState !== 'loading' ? (
              <Link
                href="/get-alerts"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium shadow-sm hover:bg-primary/90 transition-all hover:shadow-md touch-action-manipulation"
                data-testid="home-hero-cta"
              >
                <Bell className="h-4 w-4" aria-hidden="true" />
                Get Event Alerts
              </Link>
            ) : null}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section data-testid="filter-section">
        {/* Mobile filter toggle */}
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="md:hidden flex items-center justify-between w-full p-4 rounded-lg border bg-card mb-3 touch-action-manipulation"
          data-testid="mobile-filter-toggle"
        >
          <span className="flex items-center gap-2 text-sm font-medium">
            <Filter className="h-4 w-4" aria-hidden="true" />
            Filters
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs" data-testid="mobile-filter-badge">
                {selectedCategories.size}
              </Badge>
            )}
          </span>
          <ChevronDown
            className={`h-4 w-4 text-muted-foreground transition-transform ${showFilters ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </button>

        {/* Filter controls */}
        <div className={`${showFilters ? 'block' : 'hidden'} md:block`} data-testid="filter-controls">
          <Card className="border-muted bg-card/50" data-testid="filter-card">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-3">
                {/* Category Dropdown */}
                <div className="relative flex-1 md:flex-none" ref={dropdownRef}>
                  <Button
                    variant="outline"
                    onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                    className="w-full md:w-auto md:min-w-[180px] md:max-w-[320px] justify-between h-11 touch-action-manipulation"
                    data-testid="category-dropdown-trigger"
                  >
                    <span className="truncate text-left">{categoryButtonLabel}</span>
                    <ChevronDown
                      className={`h-4 w-4 ml-2 flex-shrink-0 transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`}
                      aria-hidden="true"
                    />
                  </Button>

                  {categoryDropdownOpen && (
                    <div
                      className="absolute z-50 mt-2 w-full md:w-64 rounded-lg border bg-popover p-2 shadow-lg animate-scale-in"
                      data-testid="category-dropdown"
                    >
                      <div className="max-h-64 overflow-y-auto space-y-0.5">
                        {PROTEST_CATEGORIES.map((category) => (
                          <label
                            key={category}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-muted cursor-pointer text-sm transition-colors touch-action-manipulation"
                          >
                            <Checkbox
                              checked={selectedCategories.has(category)}
                              onCheckedChange={() => toggleCategory(category)}
                              data-testid={`category-filter-${category}`}
                            />
                            <span>{CATEGORY_LABELS[category]}</span>
                          </label>
                        ))}
                      </div>
                      {selectedCategories.size > 0 && (
                        <div className="border-t mt-2 pt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full text-xs h-9"
                            onClick={() => setSelectedCategories(new Set())}
                          >
                            Clear selection
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Date Range - stacked on mobile, inline on desktop */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-2">
                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="start-date"
                      className="text-sm text-muted-foreground whitespace-nowrap"
                    >
                      From
                    </Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="h-11 w-full sm:w-[150px]"
                      autoComplete="off"
                      data-testid="start-date-filter"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <Label
                      htmlFor="end-date"
                      className="text-sm text-muted-foreground whitespace-nowrap"
                    >
                      To
                    </Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="h-11 w-full sm:w-[150px]"
                      autoComplete="off"
                      data-testid="end-date-filter"
                    />
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    onClick={clearFilters}
                    className="text-muted-foreground hover:text-foreground h-11 touch-action-manipulation"
                    data-testid="clear-filters"
                  >
                    <X className="h-4 w-4 mr-1.5" aria-hidden="true" />
                    Clear
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Events List */}
      <section data-testid="events-list">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {hasActiveFilters
              ? `${filteredProtests.length} Event${filteredProtests.length !== 1 ? 's' : ''} Found`
              : 'Upcoming Events'}
          </h2>
        </div>

        {filteredProtests.length === 0 ? (
          <Card className="p-8 text-center" data-testid="events-empty-state">
            <div className="flex flex-col items-center gap-3">
              <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center" data-testid="events-empty-icon">
                <CalendarIcon className="h-6 w-6 text-muted-foreground" aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium" data-testid="events-empty-title">No events match your filters</p>
                <p className="text-sm text-muted-foreground mt-1" data-testid="events-empty-description">
                  Try adjusting your date range or categories
                </p>
              </div>
              {hasActiveFilters && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="mt-2 touch-action-manipulation"
                  data-testid="events-empty-clear-btn"
                >
                  Clear all filters
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <div className="space-y-3">
            {filteredProtests.map((protest, index) => {
              const { weekday, monthDay, isToday } = formatEventDate(protest.date);
              return (
                <Card
                  key={protest.id}
                  className="overflow-hidden card-hover group animate-fade-in cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                  data-testid={`event-card-${protest.slug}`}
                  onClick={() => router.push(`/events/${protest.slug}`)}
                >
                  <CardContent className="p-0">
                    <div className="flex">
                      {/* Date column - highlighted if event is today */}
                      <div
                        className={`flex-shrink-0 w-16 sm:w-20 flex flex-col items-center justify-center py-4 border-r ${
                          isToday
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'bg-primary/5 dark:bg-primary/10 border-primary/10'
                        }`}
                        data-testid={`event-date-${protest.slug}`}
                      >
                        <span
                          className={`text-xs font-medium uppercase tracking-wide ${isToday ? 'text-primary-foreground' : 'text-primary'}`}
                          data-testid={`event-weekday-${protest.slug}`}
                        >
                          {isToday ? 'Today' : weekday}
                        </span>
                        <span
                          className={`text-lg sm:text-xl font-bold mt-0.5 ${isToday ? 'text-primary-foreground' : 'text-foreground'}`}
                          data-testid={`event-monthday-${protest.slug}`}
                        >
                          {monthDay}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 p-4 min-w-0" data-testid={`event-content-${protest.slug}`}>
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-base sm:text-lg group-hover:text-primary transition-colors line-clamp-2" data-testid={`event-title-${protest.slug}`}>
                              {protest.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0" data-testid={`event-actions-${protest.slug}`}>
                            <span
                              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary whitespace-nowrap"
                              data-testid={`event-category-${protest.slug}`}
                            >
                              {CATEGORY_LABELS[protest.category]}
                            </span>
                            {/* Stop propagation so share button doesn't trigger card navigation */}
                            <div onClick={(e) => e.stopPropagation()}>
                              <ShareButton event={protestToShareable(protest)} />
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground" data-testid={`event-meta-${protest.slug}`}>
                          <span className="flex items-center gap-1.5" data-testid={`event-time-${protest.slug}`}>
                            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                            {protest.isAllDay
                              ? 'All Day'
                              : `${formatTimeDisplay(protest.startTime)}${protest.endTime ? ` – ${formatTimeDisplay(protest.endTime)}` : ''}`}
                          </span>
                          <span className="flex items-center gap-1.5" data-testid={`event-location-${protest.slug}`}>
                            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                            <span className="truncate max-w-[200px]">{protest.locationName}</span>
                          </span>
                        </div>

                        <p className="mt-2 text-sm text-muted-foreground line-clamp-2" data-testid={`event-description-${protest.slug}`}>
                          {protest.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </section>

      {/* About Section */}
      <section
        className="rounded-xl bg-secondary text-secondary-foreground p-6 md:p-8"
        data-testid="about-section"
      >
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="flex-shrink-0" data-testid="about-icon">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary shadow-lg">
              <Megaphone className="h-7 w-7 text-primary-foreground" aria-hidden="true" />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold mb-3" data-testid="about-title">About ATXProtests</h2>
            <p className="text-secondary-foreground/80 text-sm md:text-base leading-relaxed" data-testid="about-description">
              ATXProtests is a community resource for finding and sharing information about
              peaceful protests and civic actions in Austin, Texas. We believe in the power
              of collective action and aim to make it easier for Austinites to stay informed
              and get involved in causes they care about.
            </p>
            <div className="flex flex-wrap gap-3 mt-5" data-testid="about-actions">
              <Link
                href="/resources"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary-foreground/10 text-secondary-foreground text-sm font-medium hover:bg-secondary-foreground/20 transition-colors touch-action-manipulation"
                data-testid="about-resources-link"
              >
                Know Your Rights
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/get-alerts"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors touch-action-manipulation"
                data-testid="about-alerts-link"
              >
                <Bell className="h-4 w-4" aria-hidden="true" />
                Get Alerts
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
