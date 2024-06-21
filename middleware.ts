import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from './app/utility/auth';
import { getCookie } from './app/utility/cookies';

export async function middleware(req: NextRequest) {
	const token = getCookie(req, 'token');

	if (!token) return NextResponse.redirect(new URL('/login', req.url));

	try {
		verifyToken(token);
		return NextResponse.next();
	} catch (err) {
		return NextResponse.redirect(new URL('/login', req.url));
	}
}

export const config = {
	matcher: ['/issues/:path*']
};
