import { StatusBadge } from '@/app/components';
import { isValidId } from '@/app/utility/utils';
import prisma from '@/prisma/client';
import {
	Box,
	Button,
	Card,
	Grid,
	Heading,
	Separator,
	Text,
} from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import ReactMarkdowm from 'react-markdown';
import Link from 'next/link';

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
			<Grid
				columns={{ initial: '1', sm: '2' }}
				gap={'4'}
				width={'auto'}
				justify={'center'}
			>
				<Box>
					<Heading>{issue.title}</Heading>
					<Box my={'3'}>
						<StatusBadge status={issue.status} />
						<Text
							className="text-zinc-500"
							mx={'3'}
						>{`Opened on ${issue.createdAt.toDateString()}`}</Text>
					</Box>
					<Separator
						orientation="horizontal"
						size="4"
						className="mb-4"
						my={'5'}
					/>
					<Card className="prose">
						<ReactMarkdowm className="ReactMarkdowm-3">
							{issue.description}
						</ReactMarkdowm>
					</Card>
				</Box>
				<Box
					style={{
						textAlign: 'right',
					}}
				>
					<Button>
						<Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
					</Button>
				</Box>
			</Grid>
		);
	} else {
		return notFound();
	}
};

export default IssueDetailsPage;
