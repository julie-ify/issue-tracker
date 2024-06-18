import { Box } from '@radix-ui/themes';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const NewIssuesLoader = () => {
	return (
		<Box>
			<Skeleton />
			<Skeleton height={'4'}/>
		</Box>
	);
};

export default NewIssuesLoader;
