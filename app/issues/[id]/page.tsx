import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';
import { isValidId } from '@/app/utility/utils';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import StatusBadge from '@/app/components/StatusBadge';

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
				<Heading>{issue.title}</Heading>
				<Flex className="space-x-3" my={'3'}>
					<StatusBadge status={issue.status} />
					<Text>{issue.createdAt.toDateString()}</Text>
				</Flex>
				<Card>
					<p>{issue.description}</p>
				</Card>
			</div>
		);
	} else {
		return notFound();
	}
};

export default IssueDetailsPage;
