'use client';
import React from 'react';
import { Button, TextArea, TextField } from '@radix-ui/themes';
import MarkdownTextArea from '@/app/components/MarkdownTextArea';

const NewIssuePage = () => {
	return (
		<div className="max-w-96 space-y-3">
			<TextField.Root placeholder="Title">
				<TextField.Slot />
			</TextField.Root>
			<MarkdownTextArea />
			<Button>Submit New Issue</Button>
		</div>
	);
};

export default NewIssuePage;
