import { signinSchema } from '@/app/utility/zodSchema';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { generateToken, verifyPassword } from '@/app/utility/auth';
import { setCookie } from '@/app/utility/cookies';

export async function POST(request: NextRequest) {
	const body = await request.json();

	const validation = signinSchema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.errors, { status: 400 });

	const user = await prisma.user.findUnique({
		where: {
			email: body.email,
		},
	});

	if (!user)
		return NextResponse.json(
			{ message: 'Invalid email or password' },
			{ status: 401 }
		);

	const isValidPassword = await verifyPassword(body.password, user.password);
	if (!isValidPassword)
		return NextResponse.json(
			{ message: 'Invalid email or password' },
			{ status: 401 }
		);

	const token = await generateToken(user.id);
	if (!token)
		return NextResponse.json(
			{ message: 'An unexpected error occurred' },
			{ status: 500 }
		);

	const { name, email, role } = user;
	const responseData = { name, email, role };

	const response = NextResponse.json(responseData, { status: 200 });

	setCookie(response, 'token', token);
	return response;
}
