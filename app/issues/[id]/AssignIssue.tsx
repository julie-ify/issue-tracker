'use client'
import { Select } from '@radix-ui/themes';
import React from 'react';

const AssignIssue = () => {
	return (
		<Select.Root size="3" defaultValue="julie">
			<Select.Trigger className='cursor-pointer'/>
			<Select.Content>
				<Select.Item value="julie" className='cursor-pointer'>Julie</Select.Item>
				<Select.Item value="mary" className='cursor-pointer'>Mary</Select.Item>
			</Select.Content>
		</Select.Root>
	);
};

export default AssignIssue;
