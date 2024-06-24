'use client';
import { ErrorHandler } from '@/app/components';
import { setUser } from '@/app/store/reducers/user';
import { signinSchema } from '@/app/utility/zodSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Grid, TextField } from '@radix-ui/themes';
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
		<>
			<div className="max-w-full flex gap-3">
				<form
					className="max-w-full flex-1 w-32"
					onSubmit={handleSubmit(onSubmit)}
				>
					<Grid gap="3" columns={{ initial: '1', sm: '1' }}>
						<TextField.Root
							size="2"
							placeholder="Email"
							{...register('email')}
						/>
						<TextField.Root
							size="2"
							placeholder="Password"
							{...register('password')}
						/>
						{(errors.email || errors.password) && (
							<ErrorHandler>All the fields are required!</ErrorHandler>
						)}
						<Button type="submit">Signin</Button>
					</Grid>
				</form>
			</div>
			<div className="text-cyan-500">
				If you don't have account?{' '}
				<Link href="/auth/signup" className="cursor-pointer underline">
					Sign up
				</Link>
			</div>
		</>
	);
};

export default Signin;
