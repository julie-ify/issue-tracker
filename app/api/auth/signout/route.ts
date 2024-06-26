import { removeCookie } from '@/app/utility/cookies';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const response = NextResponse.json({}, { status: 200 });
	removeCookie(response, 'token')

	return response;
}
