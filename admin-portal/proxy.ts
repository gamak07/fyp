import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // 1. Initialize the response
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // 2. Setup Supabase Client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // 3. Check Authentication
  // getUser() is safe to use in proxy/middleware as it re-validates the token
  const { data: { user } } = await supabase.auth.getUser()

  // 4. Define Rules
  const path = request.nextUrl.pathname
  const isAdminRoute = path.startsWith('/')
  const isLoginPage = path === '/signin'

  // RULE A: Protect Admin Routes
  // If user tries to access /admin/... and is NOT logged in -> Redirect to Login
  if (isAdminRoute && !isLoginPage && !user) {
    // Clone the URL to keep query params if any, but change path
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/signin'
    return NextResponse.redirect(loginUrl)
  }

  // RULE B: Prevent Login Page Access for Auth Users
  // If user IS logged in and tries to access Login -> Redirect to Dashboard
  if (isLoginPage && user) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/'
    return NextResponse.redirect(dashboardUrl)
  }

  // 5. Allow request to proceed if rules pass
  return response
}

// 6. Configure which paths the proxy should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}