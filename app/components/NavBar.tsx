import React from 'react';
import Link from 'next/link';
import { AiFillBug } from 'react-icons/ai';

function NavBar() {
	const navLinks = [
		{ label: 'Dashboard', href: '/dashboard' },
		{ label: 'Issues', href: '/issues' },
	];
	return (
		<nav className="flex space-x-6 h-16 border-b items-center">
			<Link href={'/'}>
				<AiFillBug />
			</Link>
			<ul className="flex space-x-4">
				{navLinks.map((link) => (
					<Link
						className="text-slate-600 hover:text-slate-900 hover:delay-300"
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
