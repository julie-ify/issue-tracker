'use client';
import { Box, Grid } from '@radix-ui/themes';
import axios from 'axios';
import classnames from 'classnames';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { AiFillBug } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setUser } from '../store/reducers/user';
import DropDown from './DropDown';
import { errorNotice } from './Toast';
import { handleError } from './handleError';
import Skeleton from '@/app/components/Skeleton';

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
					{user?.name && <DropDown user={user} handleLogout={handleLogout} />}
					{!user?.name && (
						<Skeleton width={'2rem'} height={'2rem'} className="rounded-full" />
					)}
				</Box>
			</Grid>
		</nav>
	);
}

export default NavBar;
