import { Flex, Card, Box } from '@radix-ui/themes';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const IssueDetailsLoader = () => {
	return (
		<Box className="mx-auto max-w-2xl w-full lg:max-w-3xl space-y-3">
			<Skeleton width={'5rem'} />
			<Flex className="space-x-3" align={'center'} justify={'between'}>
				<Box>
					<Skeleton width={'8rem'} />
					<Skeleton width={'8rem'} />
				</Box>
				<Skeleton width={'8rem'} />
			</Flex>

			<Card>
				<Skeleton count={3} />
			</Card>
		</Box>
	);
};

export default IssueDetailsLoader;
