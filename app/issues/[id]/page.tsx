import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import React from 'react';
import { isValidId } from '@/app/utility/utils';
import { Box, Card, Flex, Heading, Separator, Text } from '@radix-ui/themes';
import StatusBadge from '@/app/components/StatusBadge';
import delay from 'delay';
import CreateIssueButton from '../CreateIssueButton';

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

		await delay(1000);

		return (
			<Box className="mx-auto max-w-2xl w-full lg:max-w-3xl space-y-3">
				<Heading>{issue.title}</Heading>
				<Flex className="space-x-3" align={'center'} justify={'between'}>
					<Box>
						<StatusBadge status={issue.status} />
						<Text className="text-zinc-500">{`This issue was opened on ${issue.createdAt.toDateString()}`}</Text>
					</Box>
					<CreateIssueButton />
				</Flex>
				<Separator
					orientation="horizontal"
					size="4"
					className="mb-4"
					my={'5'}
				/>
				<Card>
					<p className="p-3">{issue.description}</p>
				</Card>
			</Box>
		);
	} else {
		return notFound();
	}
};

export default IssueDetailsPage;
