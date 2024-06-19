import { isValidId } from '@/app/utility/utils';
import prisma from '@/prisma/client';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';
import DeleteIssueButton from './DeleteIssueButton';

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
			<Grid columns={{ initial: '1', sm: '5' }} gap={'5'}>
				<Box className='md:col-span-4'>
					<IssueDetails issue={issue} />
				</Box>
				<Box
					style={{
						textAlign: 'right',
					}}
				>
					<Flex direction={'column'} gap={'4'}>
						<EditIssueButton issueId={issue.id} />
						<DeleteIssueButton issueId={issue.id} />
					</Flex>
				</Box>
			</Grid>
		);
	} else {
		return notFound();
	}
};

export default IssueDetailsPage;
