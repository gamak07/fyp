import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  
  // 1. Define Paths
  const url = request.nextUrl.clone()
  const path = url.pathname
  const publicRoutes = ['/signin']
  const isPublicRoute = publicRoutes.includes(path)

  // 2. Check for Custom Supervisor Session Cookie
  const supervisorSession = request.cookies.get('supervisor_session')?.value

  // RULE A: Protect Private Routes
  // If NO session cookie exists and user is on a private page -> Redirect to Login
  if (!supervisorSession && !isPublicRoute) {
    url.pathname = '/signin'
    return NextResponse.redirect(url)
  }

  // RULE B: Redirect Logged-In Users
  // If session cookie EXISTS and user tries to go to Login -> Redirect to Dashboard
  if (supervisorSession && isPublicRoute) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

// Matcher Config
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}