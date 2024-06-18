import { Button, Spinner } from '@radix-ui/themes';
import React from 'react';

const SubmitIssueButton = ({ isSubmitting }: { isSubmitting: boolean }) => {
	return (
		<>
			<Button disabled={isSubmitting}>
				Submit New Issue {isSubmitting && <Spinner />}
			</Button>
		</>
	);
};

export default SubmitIssueButton;
