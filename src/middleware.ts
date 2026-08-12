import { NextResponse, type NextRequest } from "next/server"
import { verifyToken } from "@/lib/session-token"

const PROTECTED_ROUTES = [
  "/dashboard",
  "/settings",
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(route + "/")
  )

  if (!isProtected) {
    return NextResponse.next()
  }

  const token = request.cookies.get("ielts_session")?.value
  if (!token) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  const session = await verifyToken(token)
  if (!session) {
    const loginUrl = new URL("/login", request.url)
    loginUrl.searchParams.set("from", pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/settings/:path*"],
}