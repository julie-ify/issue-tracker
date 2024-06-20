'use client';
import { ErrorHandler } from '@/app/components';
import { setUser } from '@/app/store/reducers/user';
import { userSchema } from '@/app/utility/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, TextField } from '@radix-ui/themes';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

type SignupForm = z.infer<typeof userSchema>;

const Signup = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupForm>({
		resolver: zodResolver(userSchema),
	});

	const router = useRouter();
	const dispatch = useDispatch();

	const onSubmit: SubmitHandler<SignupForm> = async (data) => {
		const newUser = await axios.post('/api/auth/signup', data);
		dispatch(setUser(newUser.data));
		router.push('/');
		router.refresh();
	};

	return (
		<div className="max-w-full flex gap-3 h-64">
			<form
				className="max-w-full flex-1 w-32"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Grid gap="3" columns={{ initial: '1', sm: '1' }}>
					<TextField.Root
						size="2"
						placeholder="Full Name"
						{...register('name')}
					/>
					<TextField.Root size="2" placeholder="Email" {...register('email')} />
					<TextField.Root
						size="2"
						placeholder="Password"
						{...register('password')}
					/>
					{(errors.name || errors.email || errors.password) && (
						<ErrorHandler>All the fields are required!</ErrorHandler>
					)}
					<Button type="submit">Signup</Button>
				</Grid>
			</form>
		</div>
	);
};

export default Signup;
