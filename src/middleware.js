import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  console.log(request);
  const isLogin = true;
  if (isLogin) {
    // return NextResponse.next();
    return NextResponse.redirect(new URL('/auth', request.url));
  }
}

export const config = {
  matcher: ['/view', '/'],
};
