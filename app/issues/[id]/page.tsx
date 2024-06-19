import { isValidId } from '@/app/utility/utils';
import prisma from '@/prisma/client';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import IssueDetails from './IssueDetails';

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
			<Grid columns={{ initial: '1', sm: '2' }} gap={'4'} width={'auto'}>
				<Box>
					<IssueDetails issue={issue} />
				</Box>
				<Box
					style={{
						textAlign: 'right',
					}}
				>
					<EditIssueButton issueId={issue.id} />
				</Box>
			</Grid>
		);
	} else {
		return notFound();
	}
};

export default IssueDetailsPage;
