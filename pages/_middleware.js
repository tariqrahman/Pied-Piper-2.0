import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });
  const { pathname } = req.nextUrl;

  // Allow the user if the following is true: a token exists or a next-auth request is in progress
  if (pathname.includes('/api/auth') || token) {
    return NextResponse.next();
  }

  // If user doesn't have a valid token, automatically redirect to home page as access doesn't exist for the others
  //   Currently hard coded for development mode
  if (!token && pathname !== '/') {
    return NextResponse.redirect('http://localhost:3000');
  }
}
