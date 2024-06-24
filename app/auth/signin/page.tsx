'use client';
import { ErrorHandler } from '@/app/components';
import { setUser } from '@/app/store/reducers/user';
import { signinSchema } from '@/app/utility/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, TextField, Text, Box } from '@radix-ui/themes';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { z } from 'zod';

type SignupForm = z.infer<typeof signinSchema>;

const Signin = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SignupForm>({
		resolver: zodResolver(signinSchema),
	});

	const router = useRouter();
	const dispatch = useDispatch();

	const onSubmit: SubmitHandler<SignupForm> = async (data) => {
		const user = await axios.post('/api/auth/signin', data);
		dispatch(setUser(user.data));
		router.push('/');
		router.refresh();
	};

	return (
		<div className="max-w-80 m-auto space-y-5 h-full mt-20">
			<Text size={'6'} className='flex items-center justify-center font-bold'>Sign In</Text>
			<form
				className="max-w-full border p-5 space-y-5"
				onSubmit={handleSubmit(onSubmit)}
			>
				<Grid gap="5">
					<Box className="space-y-2">
						<Text size={'2'}>Full Name</Text>
						<TextField.Root
							size="3"
							placeholder="Enter your email address"
							{...register('email')}
						/>
					</Box>
					<Box className="space-y-2">
						<Text size={'2'}>Password</Text>
						<TextField.Root
							size="3"
							placeholder="Enter your password"
							{...register('password')}
						/>
					</Box>
					{(errors.email || errors.password) && (
						<ErrorHandler>All the fields are required!</ErrorHandler>
					)}
					<Button className='cursor-pointer' type="submit" size={'3'}>Sign in</Button>
				</Grid>
				<div className="text-cyan-500">
					If you don't have account?{' '}
					<Link href="/auth/signup" className="cursor-pointer underline">
						Sign up
					</Link>
				</div>
			</form>
		</div>
	);
};

export default Signin;
