import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs';
import { Megaphone } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 flex h-16 items-center border-b bg-background px-4 md:px-6"
      data-testid="header"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
            <Megaphone className="h-5 w-5 text-primary-foreground" />
          </div>
          <Link href="/" className="flex items-center" data-testid="header-logo">
            <span className="text-xl font-bold">ATX</span>
            <span className="text-xl font-bold text-primary ml-1">Protests</span>
          </Link>
        </div>
      </div>
      <div className="ml-auto flex items-center gap-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
