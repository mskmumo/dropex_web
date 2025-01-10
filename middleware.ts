import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getUser } from './lib/auth'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const user = await getUser(token)

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/admin') && user.role !== 'SUPER_ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  if (request.nextUrl.pathname.startsWith('/center') && !['CENTER_ADMIN', 'WAREHOUSE_STAFF', 'LOGISTICS_COORDINATOR'].includes(user.role)) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/center/:path*'],
}

