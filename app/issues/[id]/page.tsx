import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';
import { isValidId } from '@/app/utility/utils';

interface Props {
	params: { id: string };
}

const IssueDetailsPage = async ({ params: { id } }: Props) => {
	if (typeof id === 'string' && isValidId(id)) {
		const issue = await prisma.issue.findUnique({
			where: {
				id: parseInt(id),
			},
		});

		if (!issue) notFound();

		return (
			<div>
				<p>{issue.id}</p>
				<p>{issue.title}</p>
				<p>{issue.description}</p>
				<p>{issue.status}</p>
				<p>{issue.createdAt.toDateString()}</p>
			</div>
		);
	} else {
		return notFound();
	}
};

export default IssueDetailsPage;
