import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'ht6_session';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, '');

  if (pathname === '/api/auth/session') {
    const sessionId = request.nextUrl.searchParams.get('sessionId');
    const redirectUrl = request.nextUrl.searchParams.get('redirectUrl') || '/';

    if (!sessionId) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    const response = NextResponse.redirect(new URL(redirectUrl, request.url));
    response.cookies.set(SESSION_COOKIE_NAME, sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    return response;
  }

  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  if (pathname.startsWith('/login') || pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  if (!sessionCookie || !sessionCookie.value) {
    const loginUrl = new URL(`${process.env.HT6_API_URL}/auth/login`);
    loginUrl.searchParams.set('redirectUrl', request.nextUrl.origin);
    return NextResponse.redirect(loginUrl.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
