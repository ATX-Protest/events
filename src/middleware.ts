import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// For MVP, all routes are public - no login required to view content
// Only /volunteer requires authentication (for signing up)
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/protests(.*)',
  '/resources(.*)',
  '/updates(.*)',
  '/how-it-works(.*)',
]);

export default clerkMiddleware(async (auth, request) => {
  // Bypass authentication for Playwright testing (development only)
  if (
    process.env.NODE_ENV === 'development' &&
    process.env['PLAYWRIGHT_TESTING'] === 'true'
  ) {
    return;
  }

  // Only protect non-public routes (currently just /volunteer)
  if (!isPublicRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
