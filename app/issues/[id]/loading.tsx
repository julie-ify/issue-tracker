import Skeleton from '@/app/components/Skeleton';
import { Box, Card, Flex, Grid } from '@radix-ui/themes';

const IssueDetailsLoader = () => {
	return (
		<Grid columns={{ initial: '1', sm: '2' }} gap={'4'} width={'auto'}>
			<Box>
				<Skeleton height={'1.5rem'} />
				<Flex my={'3'} gap={'3'}>
					<Skeleton width={'4rem'} height={'1.2rem'} />
					<Skeleton width={'10rem'} height={'1.2rem'} />
				</Flex>
				<Card className="prose">
					<Skeleton count={3} height={'1.2rem'} />
				</Card>
			</Box>
			<Box
				style={{
					textAlign: 'right',
				}}
			>
				<Skeleton width={'9rem'} height={'2rem'} />
			</Box>
		</Grid>
	);
};

export default IssueDetailsLoader;
