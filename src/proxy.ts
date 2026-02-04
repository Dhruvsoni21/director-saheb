import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
    // Check if the request is for the admin section
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Exclude the login page from protection to avoid redirect loops
        if (request.nextUrl.pathname === '/admin/login') {
            // If already logged in, redirect to admin dashboard
            if (request.cookies.get('admin_session')?.value === 'true') {
                return NextResponse.redirect(new URL('/admin', request.url))
            }
            return NextResponse.next()
        }

        // Check for the admin session cookie
        const adminSession = request.cookies.get('admin_session')

        if (!adminSession || adminSession.value !== 'true') {
            // Redirect to login page if no valid session
            return NextResponse.redirect(new URL('/admin/login', request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: '/admin/:path*',
}
