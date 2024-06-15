import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/prisma/client';

const createIssueSchema = z.object({
	title: z.string().min(5).max(255),
	description: z.string().min(5),
});

export async function POST(request: NextRequest) {
	const body = await request.json();
	const validatedData = createIssueSchema.safeParse(body);

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
