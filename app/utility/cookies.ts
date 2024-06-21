import { NextResponse, NextRequest } from 'next/server';
import { serialize, parse } from 'cookie';

export const setCookie = (
	res: NextResponse,
	name: string,
	value: string,
	options: any = {}
) => {
	const stringValue =
		typeof value === 'object' ? JSON.stringify(value) : String(value);

	if ('maxAge' in options) {
		options.expires = new Date(Date.now() + options.maxAge);
		options.maxAge = options.maxAge / 1000; // convert from milliseconds to seconds
	}

	res.headers.append('Set-Cookie', serialize(name, String(stringValue), options));
};

export const getCookie = (req: NextRequest, name: string) => {
	const cookies = parse(req.headers.get('cookie') || '');
	return cookies[name];
};

export const removeCookie = (res: NextResponse, name: string) => {
	res.headers.append('Set-Cookie', serialize(name, '', { maxAge: -1 }));
};
