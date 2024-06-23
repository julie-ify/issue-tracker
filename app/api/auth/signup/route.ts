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
			{ message: 'Invalid email or password' },
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
			{ message: 'An unexpected error occurred' },
			{ status: 401 }
		);
	}

	const token = await generateToken(user.id);
	if (!token)
		return NextResponse.json(
			{ message: 'An unexpected error occurred' },
			{ status: 401 }
		);

	const { name, email, role } = user;
	const responseData = { name, email, role };

	const response = NextResponse.json(responseData, { status: 201 });

	setCookie(response, 'token', token);
	return response;
}
