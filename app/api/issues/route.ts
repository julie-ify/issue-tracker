import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { IssueSchema } from '@/app/utility/zodSchema';
import { getCookie } from '@/app/utility/cookies';
import { verifyToken } from '@/app/utility/auth';

export async function POST(request: NextRequest) {
	// allow only logged in valid users to access this endpoint
	const token = getCookie(request, 'token');
	if (!token)
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

	await verifyToken(token);
	
	const body = await request.json();
	const validatedData = IssueSchema.safeParse(body);

	if (!validatedData.success) {
		return NextResponse.json({ error: validatedData.error }, { status: 400 });
	}

	const newIssue = await prisma.issue.create({
		data: {
			title: body.title,
			description: body.description,
		},
	});

	return NextResponse.json(newIssue, { status: 201 });
}
