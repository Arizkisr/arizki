import { type NextRequest, NextResponse } from "next/server"

// Define protected routes
const protectedRoutes = ["/admin"]
const publicRoutes = ["/login", "/register-complaint", "/"]

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some((route) => path.startsWith(route))
  const isPublicRoute = publicRoutes.includes(path)

  // Get session from cookie
  const session = request.cookies.get("session")?.value

  // Redirect to login if accessing protected route without session
  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }

  // Redirect to admin if logged in and accessing login page
  if (path === "/login" && session) {
    return NextResponse.redirect(new URL("/admin", request.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
