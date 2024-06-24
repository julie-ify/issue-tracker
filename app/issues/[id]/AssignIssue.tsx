'use client';
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AssignIssue = () => {
	const [users, setUsers] = useState<User[]>([]);

	useEffect(() => {
		const fetchUsers = async () => {
			const { data } = await axios.get('/api/auth/users');
			setUsers(data);
		};
		fetchUsers();
	}, []);
	return (
		<Select.Root size="3" defaultValue='Assign issue'>
			<Select.Trigger className="cursor-pointer" />
			<Select.Content>
				{users.map((user) => (
					<Select.Item key={user.id} value={user.id} className="cursor-pointer">
						{user.name}
					</Select.Item>
				))}
			</Select.Content>
		</Select.Root>
	);
};

export default AssignIssue;
