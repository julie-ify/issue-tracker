import React from 'react';
import NextLink from 'next/link';
import { Link as RadixLink } from '@radix-ui/themes';

interface Props {
	href: string;
	children: string;
}

// use custom link component so as to use redix theme
const Link = ({ href, children }: Props) => {
	return (
		<NextLink href={href} passHref legacyBehavior>
			<RadixLink>{children}</RadixLink>
		</NextLink>
	);
};

export default Link;
