import StatusBadge from '@/app/components/StatusBadge';
import { isValidId } from '@/app/utility/utils';
import prisma from '@/prisma/client';
import { Box, Card, Flex, Heading, Separator, Text } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import CreateIssueButton from '../CreateIssueButton';
import ReactMarkdowm from 'react-markdown'

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
			<Box>
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
				<Card className='prose'>
					<ReactMarkdowm className="ReactMarkdowm-3">{issue.description}</ReactMarkdowm>
				</Card>
			</Box>
		);
	} else {
		return notFound();
	}
};

export default IssueDetailsPage;
