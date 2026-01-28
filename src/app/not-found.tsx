import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center"
      data-testid="not-found-page"
    >
      <div className="space-y-2">
        <h1 className="text-6xl font-bold text-muted-foreground">404</h1>
        <h2 className="text-2xl font-semibold">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Find Events</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/action-hub">Take Action</Link>
        </Button>
      </div>
    </div>
  );
}
