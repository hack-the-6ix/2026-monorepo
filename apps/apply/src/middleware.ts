export async function middleware() {
  //   try {
  //     const res = await fetchWithCookies(`${process.env.HT6_API_URL}/auth/check`);
  //     if (!res.ok) throw new Error('Failed auth check. Triggering login');
  //   } catch (err) {
  //     console.error(err);

  //     const loginUrl = new URL(`${process.env.HT6_API_URL}/auth/login`);

  //     const fallbackRedirectTarget =
  //       process.env.HOST_URL || request.nextUrl.origin;

  //     loginUrl.searchParams.set('redirectUrl', fallbackRedirectTarget);

  //     return NextResponse.redirect(loginUrl.toString());
  //   }
  return;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
