'use client';
import React from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Button, Text, TextField } from '@radix-ui/themes';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
// incoporate react hook form with zod validation
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/zodSchema';
import { z } from 'zod';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
	const router = useRouter();
	const errorNotice = (msg: string) => toast.error(msg);
	const successNotice = (msg: string) => toast.success(msg);

	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema),
	});

	// the submitHandler receives the data (title and description) object from the form
	const onSubmit: SubmitHandler<IssueForm> = async (data) => {
		try {
			await axios.post('/api/issues', data);
			successNotice('Issue created successfully');
			router.push('/issues');
		} catch (error) {
			if (axios.isAxiosError(error)) {
				if (error.response) {
					switch (error.response.status) {
						case 400:
							errorNotice(error.response.data.error.issues[0].message);
							break;
						case 500:
							errorNotice('500 Internal Server Error');
							break;
					}
				} else {
					errorNotice('Unexpected Error, try again later');
				}
			} else {
				errorNotice('Sorry, try again later');
			}
		}
	};

	return (
		<form className="max-w-96 space-y-3" onSubmit={handleSubmit(onSubmit)}>
			<TextField.Root
				placeholder="Title"
				{...register('title', { required: true })}
			/>
			{errors.title && (
				<Text color="red" as="p">
					Title is required
				</Text>
			)}
			{/* use controller to render simpleMDE component because it is not a react input field */}
			<Controller
				name="description"
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<SimpleMDE placeholder="Description" {...field} />
				)}
			/>

			{errors.description && (
				<Text color="red" as="p">
					Description is required
				</Text>
			)}

			<Button>Submit New Issue</Button>
		</form>
	);
};

export default NewIssuePage;
