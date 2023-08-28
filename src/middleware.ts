import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const credentials = (request.cookies.get('tokenAccess'));
  console.log(request.cookies.get('tokenAccess'))

  if (request.nextUrl.pathname.startsWith('/admin')) {
    if(!credentials) {
      const url = request.nextUrl.clone()
      url.pathname = '/auth/sign-in'
      console.log(url)
      return NextResponse.rewrite(url)
    }
  }
  return NextResponse.next();
}