import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

// Only run auth refresh on app routes (not static assets / HMR)
export const config = {
  matcher: ["/", "/dashboard/:path*"],
};
