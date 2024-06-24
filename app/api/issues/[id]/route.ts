import { getCookie } from '@/app/utility/cookies';
import { IssueSchema } from '@/app/utility/zodSchema';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
	params: { id: string };
}

export async function PATCH(request: NextRequest, { params: { id } }: Props) {
	// allow only logged in valid users to access this endpoint
	const token = getCookie(request, 'token');
	if (!token)
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

	const body = await request.json();
	const validateBody = IssueSchema.safeParse(body);
	if (!validateBody.success)
		return NextResponse.json(validateBody.error.format(), { status: 400 });

	const issue = await prisma.issue.findUnique({
		where: {
			id: parseInt(id),
		},
	});

	if (!issue)
		return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

	const updatedIssue = await prisma.issue.update({
		where: {
			id: issue.id,
		},
		data: {
			title: body.title,
			description: body.description,
		},
	});

	if (updatedIssue) {
		return NextResponse.json(updatedIssue, { status: 200 });
	} else {
		return NextResponse.json(
			{ error: 'An unexpected error occured' },
			{ status: 500 }
		);
	}
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
	const token = getCookie(request, 'token');
	if (!token)
		return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

	const issue = await prisma.issue.findUnique({
		where: {
			id: parseInt(id),
		},
	});

	if (!issue)
		return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

	await prisma.issue.delete({
		where: {
			id: issue.id,
		},
	});

	return NextResponse.json({}, { status: 200 });
}
