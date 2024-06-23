import { verifyToken } from '@/app/utility/auth';
import { getCookie } from '@/app/utility/cookies';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
	const token = getCookie(request, 'token');

	if (!token)
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

	try {
		const decoded: any = await verifyToken(token);

		const user = await prisma.user.findUnique({
			where: {
				id: decoded.userId,
			},
			select: { name: true, email: true, role: true },
		});

		if (!user)
			return NextResponse.json({ message: 'User not found' }, { status: 404 });
		const res = NextResponse.json(user);


		return NextResponse.json(user);
	} catch (error) {
		if (error instanceof Error)
			return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

		return NextResponse.json({ message: 'Unexpected error' }, { status: 401 });
	}
}
