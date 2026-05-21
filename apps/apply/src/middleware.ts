import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'ht6_session';

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, '');

  if (pathname === '/api/auth/session') {
    const sessionId = request.nextUrl.searchParams.get('sessionId');
    const redirectUrl = request.nextUrl.searchParams.get('redirectUrl') || '/';

    if (!sessionId) {
      return NextResponse.redirect(new URL('/error', request.url));
    }

    const response = NextResponse.redirect(redirectUrl);
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

  try {
    if (!sessionCookie) throw new Error('No session cookie');

    const res = await fetch(`${process.env.HT6_API_URL}/auth/check`, {
      headers: { Cookie: `${SESSION_COOKIE_NAME}=${sessionCookie.value}` },
    });

    if (!res.ok) throw new Error('Auth check failed');

    return NextResponse.next();
  } catch (err) {
    console.error(err);

    const loginUrl = new URL(`${process.env.HT6_API_URL}/auth/login`);
    loginUrl.searchParams.set(
      'redirectUrl',
      process.env.HOST_URL || request.nextUrl.origin,
    );
    return NextResponse.redirect(loginUrl.toString());
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
