import { Box, Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import { HiMiniPencilSquare } from 'react-icons/hi2';

const EditIssueButton = ({ issueId }: { issueId: number }) => {
	return (
		<>
			<Button size={'3'} className="">
				<Link href={`/issues/${issueId}/edit`}>
					<Flex justify={'center'} align={'center'} gap={'3'}>
						<HiMiniPencilSquare />
						Edit Issue
					</Flex>
				</Link>
			</Button>
		</>
	);
};

export default EditIssueButton;
