import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'ht6_session';

export async function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  if (request.nextUrl.pathname === '/auth/callback') {
    return NextResponse.next();
  }

  try {
    const headers: HeadersInit = {};
    if (sessionCookie) {
      headers['Cookie'] = `${SESSION_COOKIE_NAME}=${sessionCookie.value}`;
    }

    const res = await fetch(`${process.env.HT6_API_URL}/auth/check`, {
      headers,
    });

    if (!res.ok) throw new Error('Auth check failed');

    return NextResponse.next();
  } catch (err) {
    console.error(err);

    const loginUrl = new URL(`${process.env.HT6_API_URL}/auth/login`);
    const redirectTarget = process.env.HOST_URL || request.nextUrl.origin;
    loginUrl.searchParams.set('redirectUrl', redirectTarget);

    return NextResponse.redirect(loginUrl.toString());
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
