'use client';
import React from 'react';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import {
	Grid,
	Box,
	Button,
	DropdownMenu,
	Text,
	Avatar,
} from '@radix-ui/themes';
import axios from 'axios';
import { setUser } from '../store/reducers/user';
import { errorNotice } from './Toast';
import { handleError } from './handleError';
import { extractFirstLetter } from '../utility/utils';

const navLinks = [
	{ label: 'Dashboard', href: '/' },
	{ label: 'Issues', href: '/issues/list' },
];

function NavBar() {
	const dispatch = useDispatch();
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await axios.post('/api/auth/signout', {});
			dispatch(setUser(null));
			router.push('/');
			router.refresh();
		} catch (error) {
			const errorMsg = handleError(error);
			errorNotice(errorMsg);
		}
	};

	const user = useSelector((state: RootState) => state.user.userData);
	const pathName = usePathname();

	return (
		<nav className="h-16 border-b items-center mb-9 px-10 max-w-full">
			<Grid columns={'2'} justify={'between'} align={'center'} className="h-16">
				<Box className="flex items-center gap-8">
					<Link href={'/'}>
						<AiFillBug />
					</Link>

					<ul className="flex space-x-4">
						{navLinks.map((link) => (
							<Link
								className={classnames({
									'text-cyan-600': link.href === pathName,
									'text-zinc-500': link.href !== pathName,
									'hover:text-cyan-600 transition-colors': true,
								})}
								key={link.href}
								href={link.href}
							>
								{link.label}
							</Link>
						))}
					</ul>
				</Box>
				<Box className="flex justify-end">
					{!user?.name && (
						<Link
							className={classnames({
								'text-cyan-600': '/auth/signin' === pathName,
								'text-zinc-500': '/auth/signin' !== pathName,
								'hover:text-cyan-600 transition-colors': true,
							})}
							href={'/auth/signin'}
						>
							Signin
						</Link>
					)}

					{user?.name && (
						<Box className="flex gap-4 items-center">
							<DropdownMenu.Root>
								<DropdownMenu.Trigger>
									<Button variant="soft" className='rounded-full cursor-pointer'>
										{extractFirstLetter(user.name)}
									</Button>
								</DropdownMenu.Trigger>
								<DropdownMenu.Content>
									<DropdownMenu.Label>
										<Text size={'2'}>{user.email}</Text>
									</DropdownMenu.Label>
									<DropdownMenu.Item>
										<Text
											className="cursor-pointer"
											onClick={handleLogout}
											size={'2'}
										>
											Logout
										</Text>
									</DropdownMenu.Item>
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Box>
					)}
				</Box>
			</Grid>
		</nav>
	);
}

export default NavBar;
