import { NextRequest, NextResponse } from 'next/server';

import { fetchWithCookies } from '@/actions';

const APPLICATION_PATH_PREFIXES = [
  '/about-you',
  '/experiences',
  '/long-answer',
  '/survey',
  '/review',
  '/thank-you',
] as const;

function isApplicationPath(pathname: string) {
  return APPLICATION_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export async function middleware(request: NextRequest) {
  if (isApplicationPath(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/', request.url));
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
    console.error(err, request.cookies);
    const loginUrl = new URL(`${process.env.HT6_API_URL}/auth/login`);
    loginUrl.searchParams.set('redirectUrl', process.env.HOST_URL!);
    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
