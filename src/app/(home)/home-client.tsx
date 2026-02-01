'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Protest } from '@/db/schema';
import { CATEGORY_LABELS, PROTEST_CATEGORIES, type ProtestCategory } from '@/lib/categories';
import { Calendar as CalendarIcon, ChevronDown, Clock, MapPin, Megaphone, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

interface HomePageClientProps {
  initialProtests: Protest[];
}

// Format time for display (HH:MM -> h:MM AM/PM)
function formatTimeDisplay(time: string | null): string {
  if (!time) return '';
  const [hours, minutes] = time.split(':').map(Number);
  const h = hours ?? 0;
  const m = minutes ?? 0;
  const period = h >= 12 ? 'PM' : 'AM';
  const displayHour = h % 12 || 12;
  return `${displayHour}:${String(m).padStart(2, '0')} ${period}`;
}

// Format date as YYYY-MM-DD for input[type="date"]
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

// Parse categories from URL param
function parseCategoriesFromUrl(param: string | null): Set<ProtestCategory> {
  if (!param) return new Set();
  const categories = param.split(',').filter((c): c is ProtestCategory =>
    PROTEST_CATEGORIES.includes(c as ProtestCategory)
  );
  return new Set(categories);
}

export function HomePageClient({ initialProtests }: HomePageClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize state from URL params
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update URL when filters change
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

  // Sync URL when filters change
  useEffect(() => {
    updateUrl(selectedCategories, startDate, endDate);
  }, [selectedCategories, startDate, endDate, updateUrl]);

  // Close dropdown when clicking outside
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

  // Filter protests based on selected categories and date range
  const filteredProtests = initialProtests.filter((protest) => {
    // Category filter (if any selected, must match one)
    if (selectedCategories.size > 0 && !selectedCategories.has(protest.category)) {
      return false;
    }

    // Date range filter (inclusive)
    if (startDate && protest.date < startDate) {
      return false;
    }
    if (endDate && protest.date > endDate) {
      return false;
    }

    return true;
  });

  const categoryButtonLabel =
    selectedCategories.size === 0
      ? 'All Categories'
      : selectedCategories.size === 1
        ? CATEGORY_LABELS[[...selectedCategories][0]!]
        : `${selectedCategories.size} Categories`;

  return (
    <div className="flex flex-col gap-8 md:gap-12" data-testid="home-page">
      {/* Hero Section */}
      <section className="text-center py-4 md:py-8">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Find Upcoming Protests in Austin, TX
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Stay informed about local protests and civic actions
        </p>
      </section>

      {/* Filter Section */}
      <Card className="bg-muted/30 border-muted" data-testid="filter-section">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            {/* Category Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                className="min-w-[160px] justify-between"
                data-testid="category-dropdown-trigger"
              >
                <span className="truncate">{categoryButtonLabel}</span>
                <ChevronDown className={`h-4 w-4 ml-2 transition-transform ${categoryDropdownOpen ? 'rotate-180' : ''}`} />
              </Button>

              {categoryDropdownOpen && (
                <div className="absolute z-50 mt-1 w-56 rounded-md border bg-popover p-2 shadow-md" data-testid="category-dropdown">
                  <div className="max-h-64 overflow-y-auto space-y-1">
                    {PROTEST_CATEGORIES.map((category) => (
                      <label
                        key={category}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-sm hover:bg-muted cursor-pointer text-sm"
                      >
                        <Checkbox
                          checked={selectedCategories.has(category)}
                          onCheckedChange={() => toggleCategory(category)}
                          data-testid={`category-filter-${category}`}
                        />
                        {CATEGORY_LABELS[category]}
                      </label>
                    ))}
                  </div>
                  {selectedCategories.size > 0 && (
                    <div className="border-t mt-2 pt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-xs"
                        onClick={() => setSelectedCategories(new Set())}
                      >
                        Clear selection
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Date Range */}
            <div className="flex items-center gap-2">
              <Label htmlFor="start-date" className="text-sm text-muted-foreground whitespace-nowrap">
                From
              </Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-9 w-[140px]"
                data-testid="start-date-filter"
              />
            </div>

            <div className="flex items-center gap-2">
              <Label htmlFor="end-date" className="text-sm text-muted-foreground whitespace-nowrap">
                To
              </Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-9 w-[140px]"
                data-testid="end-date-filter"
              />
            </div>

            {/* Clear Filters */}
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
                data-testid="clear-filters"
              >
                <X className="h-4 w-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Events List */}
      <section data-testid="events-list">
        <h2 className="text-xl font-semibold mb-4">
          {hasActiveFilters ? `${filteredProtests.length} Event${filteredProtests.length !== 1 ? 's' : ''} Found` : 'Upcoming Events'}
        </h2>
        {filteredProtests.length === 0 ? (
          <p className="text-muted-foreground">No events match your filters.</p>
        ) : (
          <div className="space-y-4">
            {filteredProtests.map((protest) => (
              <Link key={protest.id} href={`/events/${protest.slug}`}>
                <Card
                  className="overflow-hidden hover:shadow-md transition-shadow"
                  data-testid={`event-card-${protest.slug}`}
                >
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{protest.title}</h3>
                      <Badge variant="secondary" className="w-fit text-xs">
                        {CATEGORY_LABELS[protest.category]}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>
                          {new Date(protest.date).toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>
                          {protest.isAllDay
                            ? 'All Day'
                            : `${formatTimeDisplay(protest.startTime)}${protest.endTime ? ` - ${formatTimeDisplay(protest.endTime)}` : ''}`}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{protest.locationName}</span>
                      </div>
                    </div>
                    <p className="mt-3 text-sm line-clamp-2">{protest.description}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* About Section */}
      <section className="bg-muted/50 rounded-lg p-6 md:p-8" data-testid="about-section">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <div className="flex-shrink-0">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary">
              <Megaphone className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-2">About ATXProtests</h2>
            <p className="text-muted-foreground">
              ATXProtests is a community resource for finding and sharing information about
              peaceful protests and civic actions in Austin, Texas. We believe in the power
              of collective action and aim to make it easier for Austinites to stay informed
              and get involved in causes they care about.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
