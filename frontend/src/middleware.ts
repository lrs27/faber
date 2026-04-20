import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;
  
  // Extract subdomain
  // Example: username.faber.io → username
  const subdomain = hostname.split('.')[0];
  
  // Define your main domain (without subdomain)
  const mainDomain = process.env.NEXT_PUBLIC_MAIN_DOMAIN || 'localhost:3000';
  
  // Skip if it's the main domain (no subdomain or www)
  if (hostname === mainDomain || subdomain === 'www' || !hostname.includes('.')) {
    return NextResponse.next();
  }
  
  // If accessing via subdomain (username.faber.io)
  // Rewrite to /portfolio/[username] to show that user's main portfolio
  if (url.pathname === '/' || url.pathname === '/portfolio') {
    // Rewrite to the dynamic portfolio page with username as param
    url.pathname = `/u/${subdomain}`;
    return NextResponse.rewrite(url);
  }
  
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
