import { NextRequest, NextResponse } from 'next/server';

import { HT6_API_SERVER_URL } from '@/lib/api';

export async function GET(request: NextRequest) {
  const redirectUrl = request.nextUrl.searchParams.get('redirectUrl');
  const seasonCode = request.nextUrl.searchParams.get('seasonCode');

  if (!redirectUrl || !seasonCode) {
    return NextResponse.redirect(
      new URL('/?discord=link_failed', request.nextUrl.origin),
    );
  }

  const target = new URL(`${HT6_API_SERVER_URL}/discord/link`);
  target.searchParams.set('redirectUrl', redirectUrl);
  target.searchParams.set('seasonCode', seasonCode);

  const response = await fetch(target.toString(), {
    headers: { Cookie: request.headers.get('cookie') ?? '' },
    redirect: 'manual',
  });

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get('location');
    if (location) {
      return NextResponse.redirect(location);
    }
  }

  return NextResponse.redirect(
    new URL('/?discord=link_failed', request.nextUrl.origin),
  );
}
