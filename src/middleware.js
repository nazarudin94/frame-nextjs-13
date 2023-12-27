import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const isLogin = false;
  if (isLogin) {
    // return NextResponse.next();
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/view', '/'],
};
