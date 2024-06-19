'use client';
import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	const router = useRouter();
	const [error, setError] = useState(false);

	const deleteIssue = async () => {
		try {
			await axios.delete(`/api/issues/${issueId}`);
			router.push('/issues');
			router.refresh();
		} catch (error) {
			setError(true);
		}
	};

	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button className="cursor-pointer" size={'3'} color="red">
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
							<Button className="cursor-pointer" variant="soft" color="gray">
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button
								className="cursor-pointer"
								variant="solid"
								color="red"
								onClick={deleteIssue}
							>
								Confirm
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>

			<AlertDialog.Root open={error}>
				<AlertDialog.Content maxWidth="450px">
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description size="2">
						Issue could not be deleted, try again later
					</AlertDialog.Description>
					<AlertDialog.Action>
						<Flex justify="end">
							<Button
								className="cursor-pointer"
								mt={'4'}
								variant="soft"
								color="gray"
								onClick={() => setError(false)}
							>
								Ok
							</Button>
						</Flex>
					</AlertDialog.Action>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	);
};

export default DeleteIssueButton;
