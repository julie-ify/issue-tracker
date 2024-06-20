import { userSchema } from '@/app/utility/zodSchema';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
	const body = await request.json();

	const validation = userSchema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.errors, { status: 400 });

	const securePassword = await bcrypt.hash(body.password, 10);
	const user = await prisma.user.create({
		data: {
			name: body.name,
			email: body.email,
			password: securePassword,
		},
	});

	const { name, email, role, createdAt } = user;

	const formatedUser = { name, email, role, createdAt };

	return NextResponse.json(formatedUser, { status: 201 });
}
