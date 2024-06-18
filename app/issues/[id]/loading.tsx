import { Flex, Card, Box } from '@radix-ui/themes';
import React from 'react';
import Skeleton from '@/app/components/Skeleton';

const IssueDetailsLoader = () => {
	return (
		<Box>
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
