import { NextRequest, NextResponse } from 'next/server';

// import { fetchWithCookies } from './actions';

export async function middleware(_request: NextRequest) {
  // Auth disabled for local testing — uncomment block below before commit
  return NextResponse.next();

  // try {
  //   const res = await fetchWithCookies(`${process.env.HT6_API_URL}/auth/check`);
  //   if (!res.ok) throw new Error('Failed auth check. Triggering login');
  // } catch (err) {
  //   console.error(err);
  //
  //   const loginUrl = new URL(`${process.env.HT6_API_URL}/auth/login`);
  //
  //   const fallbackRedirectTarget =
  //     process.env.HOST_URL || request.nextUrl.origin;
  //
  //   loginUrl.searchParams.set('redirectUrl', fallbackRedirectTarget);
  //
  //   return NextResponse.redirect(loginUrl.toString());
  // }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
