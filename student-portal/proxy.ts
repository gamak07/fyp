import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  const url = request.nextUrl.clone()
  const path = url.pathname
  
  // Public routes that don't need login
  const publicRoutes = ['/signin']
  const isPublicRoute = publicRoutes.includes(path)

  // Check for Student Session Cookie
  const studentSession = request.cookies.get('student_session')?.value

  // RULE A: Protect Private Routes
  if (!studentSession && !isPublicRoute) {
    url.pathname = '/signin'
    return NextResponse.redirect(url)
  }

  // RULE B: Redirect Logged-In Users away from Login page
  if (studentSession && isPublicRoute) {
    url.pathname = '/'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}