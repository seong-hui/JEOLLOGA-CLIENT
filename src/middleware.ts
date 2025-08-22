import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // const isLocal = process.env.NODE_ENV === 'development';
  // const token = request.cookies.get(isLocal ? 'userNickname' : 'accessToken');
  const token = request.cookies.get('userNickname');

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
