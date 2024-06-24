'use client';
import Skeleton from '@/app/components/Skeleton';
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AssignIssue = () => {
	// with react query, no need of custom error handler, state management and useEffect. It handles that
	const {
		data: users,
		error,
		isLoading,
	} = useQuery<User[]>({
		queryKey: ['users'], // cache unique identifier
		queryFn: () => axios.get('/api/auth/users').then((res) => res.data),
		staleTime: 60 * 1000, // refetch after 60s
		retry: 3, // retry 3 more times if the first fails
	});

	if (isLoading) return <Skeleton />;

	if (error) return null;

	return (
		<Select.Root size="3" defaultValue="Assign issue">
			<Select.Trigger className="cursor-pointer" />
			<Select.Content>
				{users?.map((user) => (
					<Select.Item key={user.id} value={user.id} className="cursor-pointer">
						{user.name}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default AssignIssue;
