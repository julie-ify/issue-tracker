'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Button, TextField } from '@radix-ui/themes';
import 'easymde/dist/easymde.min.css';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
// incoporate react hook form with zod validation
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/utility/zodSchema';
import { z } from 'zod';
import { Spinner, ErrorHandler } from '@/app/components';
import dynamic from 'next/dynamic';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
});

type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
	const [isSubmitting, setSubmitting] = useState(false);

	const router = useRouter();
	const errorNotice = (msg: string) => toast.error(msg);
	const successNotice = (msg: string) => toast.success(msg);

	const {
		register,
		handleSubmit,
		control,
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
		<form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
			<TextField.Root
				placeholder="Title"
				{...register('title', { required: true })}
			/>
			<ErrorHandler>{errors.title?.message}</ErrorHandler>
			<Controller
				name="description"
				control={control}
				rules={{ required: true }}
				render={({ field }) => (
					<SimpleMDE placeholder="Description" {...field} />
				)}
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
