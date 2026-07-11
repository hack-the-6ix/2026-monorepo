import { NextRequest, NextResponse } from 'next/server';

import { HT6_API_SERVER_URL } from '@/lib/api';
import { isValidInviteCode } from '@/lib/invite';

export async function GET(request: NextRequest) {
  const inviteCode = request.nextUrl.searchParams.get('inviteCode');

  if (!inviteCode || !isValidInviteCode(inviteCode)) {
    return NextResponse.redirect(new URL('/', request.nextUrl.origin));
  }

  const redirectUrl = process.env.HOST_URL || request.nextUrl.origin;
  const loginUrl = new URL(`${HT6_API_SERVER_URL}/auth/login`);
  loginUrl.searchParams.set('redirectUrl', redirectUrl);
  loginUrl.searchParams.set('inviteCode', inviteCode);

  return NextResponse.redirect(loginUrl);
}
