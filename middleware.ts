import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = new URL(req.url);

  // Protect admin route for admins only
  if (pathname.startsWith('/admin')) {
    if (!token || token.role != 'admin') {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  // Protect checkout route for logged-in users
  if (pathname.startsWith('/store/checkout')) {
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', req.url));
    }
  }

  return NextResponse.next();
}

export const cofig = {
  matcher: ['/admin/:path*', '/store/checkout/:path*'],
};
