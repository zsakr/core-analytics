import { redirect } from "next/navigation"

export const dynamic = 'force-static';
export const revalidate = false;
import type { NextRequest } from "next/server"

export function GET(request: NextRequest) {
  return redirect("/memberships")
}

