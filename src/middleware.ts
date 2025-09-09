'use server';

import {NextResponse} from 'next/server';
import type {NextRequest} from 'next/server';
import {jwtVerify} from 'jose';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-that-is-long'
);

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;

  if (
    request.nextUrl.pathname.startsWith('/admin') &&
    !request.nextUrl.pathname.startsWith('/admin/login')
  ) {
    if (!session) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(session, secret);
      // User is authenticated, allow the request to proceed
      return NextResponse.next();
    } catch (err) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // If user is logged in and tries to access login page, redirect to dashboard
  if (request.nextUrl.pathname.startsWith('/admin/login')) {
    if (session) {
      try {
        await jwtVerify(session, secret);
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      } catch (err) {
        // Token is invalid, let them stay on login page
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
