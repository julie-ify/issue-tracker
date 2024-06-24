'use client';
import { Box, DropdownMenu, Button, Text } from '@radix-ui/themes';
import React from 'react';
import user from '../store/reducers/user';
import { extractFirstLetter } from '../utility/utils';
import { UserObj } from '../utility/dataTypes';

const DropDown = ({
	user,
	handleLogout,
}: {
	user: UserObj;
	handleLogout: () => void;
}) => {
	return (
		<Box className="flex gap-4 items-center">
			<DropdownMenu.Root>
				<DropdownMenu.Trigger>
					<Button variant="soft" className="rounded-full cursor-pointer">
						{extractFirstLetter(user.name)}
					</Button>
				</DropdownMenu.Trigger>
				<DropdownMenu.Content>
					<DropdownMenu.Label>
						<Text size={'2'}>{user.email}</Text>
					</DropdownMenu.Label>
					<DropdownMenu.Item>
						<Text className="cursor-pointer" onClick={handleLogout} size={'2'}>
							Logout
						</Text>
					</DropdownMenu.Item>
				</DropdownMenu.Content>
			</DropdownMenu.Root>
		</Box>
	);
};

export default DropDown;
