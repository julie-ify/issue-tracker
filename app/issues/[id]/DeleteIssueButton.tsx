import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { IoTrashOutline } from 'react-icons/io5';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button size={'3'} color="red">
						<Flex justify={'center'} align={'center'} gap={'3'}>
							<IoTrashOutline />
							Delete
						</Flex>
					</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content maxWidth="450px">
					<AlertDialog.Title>Confirm Delete</AlertDialog.Title>
					<AlertDialog.Description size="2">
						Are you sure? This issue will be deleted and this action is
						irreversible
					</AlertDialog.Description>
					<Flex gap="3" mt="4" justify="end">
						<AlertDialog.Cancel>
							<Button variant="soft" color="gray">
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button variant="solid" color="red">
								Confirm
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default DeleteIssueButton;
