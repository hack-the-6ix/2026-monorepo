import { NextRequest, NextResponse } from 'next/server';

import { fetchWithCookies } from '@/actions';
import { HT6_API_SERVER_URL } from '@/lib/api';

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/share')) {
    return NextResponse.next();
  }
  if (
    request.nextUrl.pathname === '/team' ||
    request.nextUrl.pathname === '/team-formation'
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  try {
    const res = await fetchWithCookies(request, `${HT6_API_SERVER_URL}/auth/check`, {
      headers: { Cookie: request.cookies.toString() },
    });
    if (!res.ok) throw new Error('Failed auth check. Triggering login');
  } catch (err) {
    console.error(err, request.cookies);
    const loginUrl = new URL(`${HT6_API_SERVER_URL}/auth/login`);
    loginUrl.searchParams.set(
      'redirectUrl',
      process.env.HOST_URL || request.nextUrl.origin,
    );
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ic)$).*)',
  ],
};
