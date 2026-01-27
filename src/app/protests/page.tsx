import { ProtestCard } from '@/components/features/protests/protest-card';
import { protests } from '@/data/protests';
import { Megaphone } from 'lucide-react';

export const metadata = {
  title: 'Upcoming Protests | ATX Protests',
  description: 'Browse upcoming protests and events in Austin, Texas.',
};

export default function ProtestsPage() {
  return (
    <div className="flex flex-col gap-6" data-testid="protests-page">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
          <Megaphone className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Upcoming Protests</h1>
          <p className="text-muted-foreground">
            Find and join peaceful protests in Austin, TX
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {protests.map((protest) => (
          <ProtestCard key={protest.id} protest={protest} />
        ))}
      </div>

      {protests.length === 0 && (
        <div className="text-center py-12">
          <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h2 className="text-lg font-medium">No protests scheduled</h2>
          <p className="text-muted-foreground">
            Check back soon for upcoming events.
          </p>
        </div>
      )}
    </div>
  );
}
