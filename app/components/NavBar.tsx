'use client';
import React from 'react';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';
import classnames from 'classnames';
import { usePathname } from 'next/navigation';

function NavBar() {
	const navLinks = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues' },
	];

	const pathName = usePathname();

	return (
		<nav className="flex space-x-6 h-16 border-b items-center mb-5 px-5">
			<Link href={'/'}>
				<AiFillBug />
			</Link>
			<ul className="flex space-x-4">
				{navLinks.map((link) => (
					<Link
						className={classnames({
							'text-zinc-900': link.href === pathName,
							'text-zinc-500': link.href !== pathName,
							'hover:text-zinc-800 transition-colors': true,
						})}
						key={link.href}
						href={link.href}
					>
						{link.label}
					</Link>
				))}
			</ul>
		</nav>
	);
}

export default NavBar;
