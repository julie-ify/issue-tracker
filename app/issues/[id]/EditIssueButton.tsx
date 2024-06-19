import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import { HiMiniPencilSquare } from 'react-icons/hi2';

const EditIssueButton = ({ issueId }: { issueId: number }) => {
	return (
		<>
			<Button size={'3'} className="">
				<Link href={`/issues/${issueId}/edit`}>
					<Flex justify={'center'} align={'center'} gap={'3'}>
						<HiMiniPencilSquare />
						Edit
					</Flex>
				</Link>
			</Button>
		</>
	);
};

export default EditIssueButton;
