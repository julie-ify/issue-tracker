import { Button, Flex } from '@radix-ui/themes';
import { IoTrashOutline } from 'react-icons/io5';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	return (
		<>
			<Button size={'3'} color="red">
				<Flex justify={'center'} align={'center'} gap={'3'}>
					<IoTrashOutline />
					Delete
				</Flex>
			</Button>
		</>
	);
};

export default DeleteIssueButton;
