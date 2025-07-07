import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('userId'); // TODO : accessToken으로 변경 필요

  if ((pathname.startsWith('/myPage') || pathname.startsWith('/wishList')) && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('type', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
};

export const config = {
  matcher: ['/myPage/:path*', '/wishList/:path*'],
};
