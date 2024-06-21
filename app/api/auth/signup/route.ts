import { userSchema } from '@/app/utility/zodSchema';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { generateToken, hashPassword } from '@/app/utility/auth';
import { setCookie } from '@/app/utility/cookies';

export async function POST(request: NextRequest) {
	const body = await request.json();

	const validation = userSchema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.errors, { status: 400 });

	const existingUser = await prisma.user.findUnique({
		where: {
			email: body.email,
		},
	});

	if (existingUser)
		return NextResponse.json(
			{ error: 'Invalid email or password' },
			{ status: 401 }
		);

	const hashedPassword = await hashPassword(body.password);
	const user = await prisma.user.create({
		data: {
			name: body.name,
			email: body.email,
			password: hashedPassword,
		},
	});

	if (!user) {
		return NextResponse.json(
			{ error: 'An unexpected error occurred' },
			{ status: 401 }
		);
	}

	const token = generateToken(user.id);
	if (!token)
		return NextResponse.json(
			{ error: 'An unexpected error occurred' },
			{ status: 401 }
		);

	const { name, email, role, createdAt } = user;
	const responseData = { name, email, role, createdAt };

	const response = NextResponse.json(responseData, { status: 201 });

	setCookie(response, 'token', token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === 'production',
		maxAge: 60 * 60 * 1000, // max age in milliseconds
		path: '/',
	});
	return response;
}
