import { NextResponse, NextRequest } from 'next/server';

export const setCookie = (
	res: NextResponse,
	name: string,
	value: string,
) => {
	const stringValue =
		typeof value === 'object' ? JSON.stringify(value) : String(value);

	res.cookies.set(name, stringValue, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 1000,
		expires: new Date(Date.now() + 60 * 60 * 1000),
		path: '/',
	});
};

export const getCookie = (req: NextRequest, name: string) => {
	const token = req.cookies.get(name)?.value;
	return token;
};

export const removeCookie = (res: NextResponse, name: string) => {
	res.cookies.set(name, '', {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		expires: new Date(0), // Expire the cookie by passing expired date/time
	});
};
