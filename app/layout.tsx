import '@radix-ui/themes/styles.css';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from './components/NavBar';
import { Theme} from '@radix-ui/themes';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
	title: 'Issue Tracker App',
	description: 'Create and track issues with',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.variable}>
				<Theme accentColor="cyan">
					<NavBar />
					<main className="px-5">{children}</main>
				</Theme>
			</body>
		</html>
	);
}
