import { NextRequest, NextResponse } from 'next/server';

const SESSION_COOKIE_NAME = 'ht6_session';

export async function GET(request: NextRequest) {
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
