import { NextRequest, NextResponse } from 'next/server';

import { fetchWithCookies } from '@/actions';

const apiUrl =
  process.env.HT6_API_URL ||
  process.env.NEXT_PUBLIC_HT6_API_URL ||
  'https://v2.api.hackthe6ix.com/api';

export async function middleware(request: NextRequest) {
  try {
    const res = await fetchWithCookies(request, `${apiUrl}/auth/check`, {
      headers: { Cookie: request.cookies.toString() },
    });
    if (!res.ok) throw new Error('Failed auth check. Triggering login');
  } catch (err) {
    console.error(err, request.cookies);
    const loginUrl = new URL(`${apiUrl}/auth/login`);
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
