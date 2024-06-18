import { StatusBadge } from '@/app/components';
import { Issue } from '@prisma/client';
import { Heading, Box, Separator, Card, Text } from '@radix-ui/themes';
import React from 'react';
import ReactMarkdowm from 'react-markdown';

const IssueDetails = ({ issue }: { issue: Issue }) => {
	return (
		<>
			<Heading>{issue.title}</Heading>
			<Box my={'3'}>
				<StatusBadge status={issue.status} />
				<Text
					className="text-zinc-500"
					mx={'3'}
				>{`Opened on ${issue.createdAt.toDateString()}`}</Text>
			</Box>
			<Separator orientation="horizontal" size="4" className="mb-4" my={'5'} />
			<Card className="prose">
				<ReactMarkdowm className="ReactMarkdowm-3">
					{issue.description}
				</ReactMarkdowm>
			</Card>
		</>
	);
};

export default IssueDetails;
