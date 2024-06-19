import { Issue } from '@prisma/client';
import { Button, Spinner } from '@radix-ui/themes';
import React from 'react';

const SubmitIssueButton = ({
	isSubmitting,
	issue,
}: {
	isSubmitting: boolean;
	issue?: Issue;
}) => {
	return (
		<>
			<Button disabled={isSubmitting}>
				{issue ? 'Update Issue' : 'Submit New Issue '}
				{isSubmitting && <Spinner />}
			</Button>
		</>
	);
};

export default SubmitIssueButton;
