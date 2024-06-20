'use client';
import React from 'react';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

function NavBar() {
	const navLinks = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues/list' },
	];

	const user = useSelector((state: RootState) => state.user.userData);
	const pathName = usePathname();

	return (
		<nav className="flex space-x-6 h-16 border-b items-center mb-9 px-10">
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
			<span>LoggedIn as {user?.name}</span>
		</nav>
	);
}

export default NavBar;
