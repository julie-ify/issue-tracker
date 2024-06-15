'use client';
import { Button, TextArea, TextField } from '@radix-ui/themes';
import React from 'react';

const NewIssuePage = () => {
	return (
		<div className="max-w-96 space-y-3">
			<TextField.Root placeholder="Title">
				<TextField.Slot />
			</TextField.Root>
			<TextArea size={'3'} placeholder="Description" />
			<Button>Submit New Issue</Button>
		</div>
	);
};

export default NewIssuePage;
