import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const CreateIssueButton = () => {
	return (
		<div className="mb-4">
			<Button>
				<Link href={'/issues/new'}>Create New Issue</Link>
			</Button>
		</div>
	);
};

export default CreateIssueButton;
