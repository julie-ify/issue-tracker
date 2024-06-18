import { Box } from '@radix-ui/themes';
import React from 'react';
import Skeleton from '@/app/components/Skeleton';

const NewIssuesLoader = () => {
	return (
		<Box>
			<Skeleton />
			<Skeleton height={'4'} />
		</Box>
	);
};

export default NewIssuesLoader;
