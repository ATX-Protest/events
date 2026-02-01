'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { protestCategoryEnum, type Protest } from '@/db/schema';
import { generateSlug } from '@/lib/utils/slug';
import { Loader2, Eye, EyeOff, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState, useCallback } from 'react';
import {
  getAllEventsForAdmin,
  getEventForEdit,
  saveEvent,
  toggleEventVisibility,
  deleteEvent,
} from './actions';

const categoryLabels: Record<string, string> = {
  'civil-rights': 'Civil Rights',
  environmental: 'Environmental',
  labor: 'Labor',
  healthcare: 'Healthcare',
  education: 'Education',
  housing: 'Housing',
  immigration: 'Immigration',
  lgbtq: 'LGBTQ+',
  'police-reform': 'Police Reform',
  'voting-rights': 'Voting Rights',
  other: 'Other',
};

interface FormData {
  title: string;
  slug: string;
  description: string;
  date: string;
  isAllDay: boolean;
  startTime: string;
  endTime: string;
  locationName: string;
  hasPhysicalAddress: boolean;
  locationAddress: string;
  locationCity: string;
  locationState: string;
  locationZip: string;
  organizer: string;
  category: string;
  expectedAttendance: string;
  externalUrl: string;
  safetyInfo: string;
  tags: string;
}

const initialFormData: FormData = {
  title: '',
  slug: '',
  description: '',
  date: '',
  isAllDay: false,
  startTime: '',
  endTime: '',
  locationName: '',
  hasPhysicalAddress: true,
  locationAddress: '',
  locationCity: 'Austin',
  locationState: 'TX',
  locationZip: '',
  organizer: '',
  category: 'other',
  expectedAttendance: '',
  externalUrl: '',
  safetyInfo: '',
  tags: '',
};

export default function ShareEventPage() {
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [events, setEvents] = useState<Protest[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<string>('');
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [autoSlug, setAutoSlug] = useState(true);

  // Load password from sessionStorage on mount
  useEffect(() => {
    const savedPassword = sessionStorage.getItem('eventAdminPassword');
    if (savedPassword) {
      setPassword(savedPassword);
    }
  }, []);

  // Auto-generate slug from title
  useEffect(() => {
    if (autoSlug && formData.title && !selectedEventId) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(prev.title),
      }));
    }
  }, [formData.title, autoSlug, selectedEventId]);

  const loadEvents = useCallback(async () => {
    if (!password) return;
    setIsLoading(true);
    const result = await getAllEventsForAdmin(password);
    setIsLoading(false);

    if (result.success) {
      setEvents(result.data);
      setIsAuthenticated(true);
      sessionStorage.setItem('eventAdminPassword', password);
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
      setIsAuthenticated(false);
      sessionStorage.removeItem('eventAdminPassword');
    }
  }, [password, toast]);

  const handleLoadEvent = async () => {
    if (!selectedEventId) {
      // Reset to new event
      setFormData(initialFormData);
      setAutoSlug(true);
      return;
    }

    setIsLoading(true);
    const result = await getEventForEdit(password, selectedEventId);
    setIsLoading(false);

    if (result.success) {
      const event = result.data;
      setFormData({
        title: event.title,
        slug: event.slug,
        description: event.description,
        date: event.date,
        isAllDay: event.isAllDay,
        startTime: event.startTime ?? '',
        endTime: event.endTime ?? '',
        locationName: event.locationName,
        hasPhysicalAddress: !!(event.locationAddress && event.locationZip),
        locationAddress: event.locationAddress ?? '',
        locationCity: event.locationCity,
        locationState: event.locationState,
        locationZip: event.locationZip ?? '',
        organizer: event.organizer,
        category: event.category,
        expectedAttendance: event.expectedAttendance?.toString() ?? '',
        externalUrl: event.externalUrl ?? '',
        safetyInfo: event.safetyInfo ?? '',
        tags: event.tags.join(', '),
      });
      setAutoSlug(false);
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    const result = await saveEvent(
      password,
      {
        ...formData,
        expectedAttendance: formData.expectedAttendance || undefined,
        externalUrl: formData.externalUrl || undefined,
        safetyInfo: formData.safetyInfo || undefined,
      },
      selectedEventId || undefined
    );
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Success',
        description: selectedEventId ? 'Event updated successfully' : 'Event created successfully',
      });
      // Reload events list
      await loadEvents();
      // Select the saved event
      setSelectedEventId(result.data.id);
      setAutoSlug(false);
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  const handleToggleVisibility = async () => {
    if (!selectedEventId || isSubmitting) return;

    setIsSubmitting(true);
    const result = await toggleEventVisibility(password, selectedEventId);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Success',
        description: result.data.isHidden ? 'Event hidden from public' : 'Event visible to public',
      });
      await loadEvents();
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  const handleDelete = async () => {
    if (!selectedEventId || isSubmitting) return;

    // eslint-disable-next-line no-alert -- Admin-only page confirmation dialog
    const confirmed = window.confirm(
      'Are you sure you want to permanently delete this event? This action cannot be undone.'
    );
    if (!confirmed) return;

    setIsSubmitting(true);
    const result = await deleteEvent(password, selectedEventId);
    setIsSubmitting(false);

    if (result.success) {
      toast({
        title: 'Success',
        description: 'Event deleted successfully',
      });
      setSelectedEventId('');
      setFormData(initialFormData);
      setAutoSlug(true);
      await loadEvents();
    } else {
      toast({
        title: 'Error',
        description: result.error,
        variant: 'destructive',
      });
    }
  };

  const handleNewEvent = () => {
    setSelectedEventId('');
    setFormData(initialFormData);
    setAutoSlug(true);
  };

  const updateField = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const selectedEvent = events.find((e) => e.id === selectedEventId);

  return (
    <div className="flex flex-col gap-8 md:gap-12" data-testid="share-event-page">
      <header>
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Event Administration</h1>
        <p className="text-muted-foreground">
          Create, edit, and manage events. Password required.
        </p>
      </header>

      {/* Password Section */}
      <Card>
        <CardHeader>
          <CardTitle>Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 items-end">
            <div className="flex-1 space-y-2">
              <Label htmlFor="password">Admin Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                data-testid="input-password"
              />
            </div>
            <Button onClick={() => void loadEvents()} disabled={!password || isLoading}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Authenticate'}
            </Button>
          </div>
          {isAuthenticated && (
            <p className="text-sm text-green-600">Authenticated - {events.length} events loaded</p>
          )}
        </CardContent>
      </Card>

      {isAuthenticated && (
        <>
          {/* Event Selector */}
          <Card>
            <CardHeader>
              <CardTitle>Select Event</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 items-end">
                <div className="flex-1 space-y-2">
                  <Label htmlFor="eventSelect">Event</Label>
                  <select
                    id="eventSelect"
                    value={selectedEventId}
                    onChange={(e) => setSelectedEventId(e.target.value)}
                    className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                    data-testid="select-event"
                  >
                    <option value="">-- Create New Event --</option>
                    {events.map((event) => (
                      <option key={event.id} value={event.id}>
                        {event.isHidden ? '[HIDDEN] ' : ''}
                        {event.title} ({event.date})
                      </option>
                    ))}
                  </select>
                </div>
                <Button onClick={() => void handleLoadEvent()} disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Load'}
                </Button>
                <Button onClick={handleNewEvent} variant="outline">
                  <Plus className="h-4 w-4 mr-1" />
                  New
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Event Form */}
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedEventId ? `Edit: ${selectedEvent?.title}` : 'Create New Event'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => void handleSubmit(e)} className="space-y-6" data-testid="share-event-form">
                {/* Title & Slug */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => updateField('title', e.target.value)}
                      placeholder="e.g., March for Climate Action"
                      required
                      data-testid="input-title"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => {
                        setAutoSlug(false);
                        updateField('slug', e.target.value);
                      }}
                      placeholder="auto-generated-from-title"
                      data-testid="input-slug"
                    />
                    <p className="text-xs text-muted-foreground">
                      Leave blank for auto-generation
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => updateField('description', e.target.value)}
                    placeholder="Describe the event, its purpose, and what attendees should know..."
                    rows={4}
                    required
                    data-testid="input-description"
                  />
                  <p className={`text-xs ${formData.description.length < 10 ? 'text-destructive' : 'text-muted-foreground'}`}>
                    {formData.description.length}/10 minimum characters
                  </p>
                </div>

                {/* Date & Time */}
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => updateField('date', e.target.value)}
                        required
                        data-testid="input-date"
                      />
                    </div>
                    {!formData.isAllDay && (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="startTime">Start Time *</Label>
                          <Input
                            id="startTime"
                            type="time"
                            value={formData.startTime}
                            onChange={(e) => updateField('startTime', e.target.value)}
                            required={!formData.isAllDay}
                            data-testid="input-start-time"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endTime">End Time</Label>
                          <Input
                            id="endTime"
                            type="time"
                            value={formData.endTime}
                            onChange={(e) => updateField('endTime', e.target.value)}
                            data-testid="input-end-time"
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isAllDay"
                      checked={formData.isAllDay}
                      onCheckedChange={(checked) => updateField('isAllDay', checked === true)}
                      data-testid="checkbox-all-day"
                    />
                    <Label htmlFor="isAllDay" className="cursor-pointer">
                      All-day event
                    </Label>
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="locationName">Location Name *</Label>
                    <Input
                      id="locationName"
                      value={formData.locationName}
                      onChange={(e) => updateField('locationName', e.target.value)}
                      placeholder="e.g., Texas State Capitol, Virtual Event"
                      required
                      data-testid="input-location-name"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasPhysicalAddress"
                      checked={!formData.hasPhysicalAddress}
                      onCheckedChange={(checked) =>
                        updateField('hasPhysicalAddress', checked !== true)
                      }
                      data-testid="checkbox-online"
                    />
                    <Label htmlFor="hasPhysicalAddress" className="cursor-pointer">
                      Online event or location TBD
                    </Label>
                  </div>

                  {formData.hasPhysicalAddress && (
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="locationAddress">Street Address *</Label>
                        <Input
                          id="locationAddress"
                          value={formData.locationAddress}
                          onChange={(e) => updateField('locationAddress', e.target.value)}
                          placeholder="e.g., 1100 Congress Ave"
                          required={formData.hasPhysicalAddress}
                          data-testid="input-location-address"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="locationCity">City</Label>
                        <Input
                          id="locationCity"
                          value={formData.locationCity}
                          onChange={(e) => updateField('locationCity', e.target.value)}
                          data-testid="input-location-city"
                        />
                      </div>
                      <div className="grid gap-4 grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="locationState">State</Label>
                          <Input
                            id="locationState"
                            value={formData.locationState}
                            onChange={(e) => updateField('locationState', e.target.value)}
                            data-testid="input-location-state"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="locationZip">ZIP *</Label>
                          <Input
                            id="locationZip"
                            value={formData.locationZip}
                            onChange={(e) => updateField('locationZip', e.target.value)}
                            placeholder="78701"
                            required={formData.hasPhysicalAddress}
                            data-testid="input-location-zip"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Organizer & Category */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="organizer">Organizer *</Label>
                    <Input
                      id="organizer"
                      value={formData.organizer}
                      onChange={(e) => updateField('organizer', e.target.value)}
                      placeholder="e.g., Austin Climate Coalition"
                      required
                      data-testid="input-organizer"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <select
                      id="category"
                      value={formData.category}
                      onChange={(e) => updateField('category', e.target.value)}
                      className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                      required
                      data-testid="select-category"
                    >
                      {protestCategoryEnum.enumValues.map((cat) => (
                        <option key={cat} value={cat}>
                          {categoryLabels[cat] ?? cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Optional fields */}
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="expectedAttendance">Expected Attendance</Label>
                    <Input
                      id="expectedAttendance"
                      type="number"
                      min="1"
                      value={formData.expectedAttendance}
                      onChange={(e) => updateField('expectedAttendance', e.target.value)}
                      placeholder="e.g., 500"
                      data-testid="input-expected-attendance"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="externalUrl">External Event URL</Label>
                    <Input
                      id="externalUrl"
                      type="url"
                      value={formData.externalUrl}
                      onChange={(e) => updateField('externalUrl', e.target.value)}
                      placeholder="https://..."
                      data-testid="input-external-url"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="safetyInfo">Safety Information</Label>
                  <Textarea
                    id="safetyInfo"
                    value={formData.safetyInfo}
                    onChange={(e) => updateField('safetyInfo', e.target.value)}
                    placeholder="Any safety tips, legal observer info, water stations, etc."
                    rows={2}
                    data-testid="input-safety-info"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tags">Tags</Label>
                  <Input
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => updateField('tags', e.target.value)}
                    placeholder="climate, march, peaceful (comma-separated)"
                    data-testid="input-tags"
                  />
                </div>

                {/* Action buttons */}
                <div className="flex flex-wrap gap-3 pt-4">
                  <Button type="submit" disabled={isSubmitting} data-testid="submit-button">
                    {isSubmitting ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : null}
                    {selectedEventId ? 'Update Event' : 'Create Event'}
                  </Button>

                  {selectedEventId && (
                    <>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => void handleToggleVisibility()}
                        disabled={isSubmitting}
                        data-testid="toggle-visibility-button"
                      >
                        {selectedEvent?.isHidden ? (
                          <>
                            <Eye className="h-4 w-4 mr-2" />
                            Show Event
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-4 w-4 mr-2" />
                            Hide Event
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => void handleDelete()}
                        disabled={isSubmitting}
                        data-testid="delete-button"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
