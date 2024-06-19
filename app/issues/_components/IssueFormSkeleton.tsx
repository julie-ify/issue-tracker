import { Box } from '@radix-ui/themes';
import Skeleton from '@/app/components/Skeleton';

const IssueFormSkeleton = () => {
	return (
		<Box>
			<Skeleton height={'2rem'}/>
			<Skeleton height={'20rem'} />
			<Skeleton width={'10rem'} height={'2rem'} />
		</Box>
	);
};

export default IssueFormSkeleton;
