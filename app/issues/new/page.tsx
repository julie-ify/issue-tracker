'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, TextArea, TextField } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import { useForm, SubmitHandler } from 'react-hook-form';
// incoporate react hook form with zod validation
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/utility/zodSchema';
import { z } from 'zod';
import ErrorHandler from '@/app/components/ErrorHandler';
import Spinner from '@/app/components/Spinner';

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
	const [isSubmitting, setSubmitting] = useState(false);

	const router = useRouter();
	const errorNotice = (msg: string) => toast.error(msg);
	const successNotice = (msg: string) => toast.success(msg);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema),
	});

	// the submitHandler receives the data (title and description) object from the form
	const onSubmit: SubmitHandler<IssueForm> = async (data) => {
		try {
			await axios.post('/api/issues', data);
			setSubmitting(true);
			successNotice('Issue created successfully');
			router.push('/issues');
		} catch (error) {
			setSubmitting(false);
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
			<ErrorHandler>{errors.title?.message}</ErrorHandler>
			{/* use controller to render simpleMDE component because it is not a react input field */}
			<TextArea
				size={'3'}
				resize={'vertical'}
				{...register('description', { required: true })}
				placeholder="Description"
			/>
			{errors.description && (
				<ErrorHandler>{errors.description?.message}</ErrorHandler>
			)}
			<Button disabled={isSubmitting}>
				Submit New Issue {isSubmitting && <Spinner />}
			</Button>
		</form>
	);
};

export default NewIssuePage;
