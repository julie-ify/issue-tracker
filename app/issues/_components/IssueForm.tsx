'use client';
import { TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
// incoporate react hook form with zod validation
import { ErrorHandler } from '@/app/components';
import { errorNotice, successNotice } from '@/app/components/Toast';
import { IssueSchema } from '@/app/utility/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import SimpleMDE from 'react-simplemde-editor';
import { z } from 'zod';
import { handleError } from '../../components/handleError';
import SubmitIssueButton from './SubmitIssueButton';

type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = async ({ issue }: { issue?: Issue }) => {
	const [isSubmitting, setSubmitting] = useState(false);
	const router = useRouter();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<IssueFormData>({
		resolver: zodResolver(IssueSchema),
	});

	// the submitHandler receives the data (title and description) object from the form
	const onSubmit: SubmitHandler<IssueFormData> = async (data) => {
		try {
			if (issue) {
				axios.patch(`/api/issues/${issue.id}`, data);
				successNotice('Issue was updated successfully');
			} else {
				await axios.post('/api/issues', data);
				successNotice('Issue was created successfully');
			}
			setSubmitting(true);
			router.push('/issues/list');
			router.refresh(); // used to force page refresh to clear cache
		} catch (error) {
			setSubmitting(false);
			const errorMsg = handleError(error);
			errorNotice(errorMsg);
		}
	};

	return (
		<form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
			<TextField.Root
				placeholder="Title"
				{...register('title', { required: true })}
				defaultValue={issue?.title}
			/>
			<ErrorHandler>{errors.title?.message}</ErrorHandler>
			<Controller
				name="description"
				control={control}
				rules={{ required: true }}
				defaultValue={issue?.description}
				render={({ field }) => (
					<SimpleMDE placeholder="Description" {...field} />
				)}
			/>
			{errors.description && (
				<ErrorHandler>{errors.description?.message}</ErrorHandler>
			)}
			<SubmitIssueButton isSubmitting={isSubmitting} issue={issue} />
		</form>
	);
};

export default IssueForm;
