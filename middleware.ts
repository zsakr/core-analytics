import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Simple middleware that allows all routes without authentication
export async function middleware(req: NextRequest) {
  // Allow access to all routes
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
}

