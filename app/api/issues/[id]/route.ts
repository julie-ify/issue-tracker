import { IssueSchema } from '@/app/utility/zodSchema';
import prisma from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

interface Props {
	params: { id: string };
}

export async function PATCH(request: NextRequest, { params: { id } }: Props) {
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
