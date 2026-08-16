import { NextRequest, NextResponse } from 'next/server';

import { fetchWithCookies } from '@/actions';
import { featureFlags } from '@/feature-flags';

export async function middleware(request: NextRequest) {
  if (!featureFlags.applicationFormOpen) {
    if (request.nextUrl.pathname !== '/') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  try {
    const res = await fetchWithCookies(
      request,
      `${process.env.HT6_API_URL}/auth/check`,
      {
        headers: { Cookie: request.cookies.toString() },
      },
    );
    if (!res.ok) throw new Error('Failed auth check. Triggering login');
  } catch (err) {
    console.error(err);
    const loginUrl = new URL(`${process.env.HT6_API_URL}/auth/login`);
    loginUrl.searchParams.set('redirectUrl', process.env.HOST_URL!);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
