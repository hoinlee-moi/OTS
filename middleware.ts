import { getToken } from "next-auth/jwt";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export default async function middleware(request: NextRequest) {
  const session = await getToken({ req: request });

  if(request.nextUrl.pathname==="/") {
    if(session) return NextResponse.redirect(new URL("/main",request.url))
  }

  if (request.nextUrl.pathname.startsWith("/main")) {
    if (session == null) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }
}

