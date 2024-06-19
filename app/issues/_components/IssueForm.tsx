'use client';
import { TextField } from '@radix-ui/themes';
import axios from 'axios';
import 'easymde/dist/easymde.min.css';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
// incoporate react hook form with zod validation
import { ErrorHandler } from '@/app/components';
import { IssueSchema } from '@/app/utility/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import dynamic from 'next/dynamic';
import { z } from 'zod';
import { handleError } from '../new/handleError';
import SubmitIssueButton from './SubmitIssueButton';
import { Issue } from '@prisma/client';

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
});

type IssueFormData = z.infer<typeof IssueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
	const [isSubmitting, setSubmitting] = useState(false);
	const router = useRouter();
	const errorNotice = (msg: string) => toast.error(msg);
	const successNotice = (msg: string) => toast.success(msg);

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
			router.push('/issues');
		} catch (error) {
			console.log(error)
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
