import prisma from '@/prisma/client';
import { Button, Table } from '@radix-ui/themes';
import Link from 'next/link';
import CustomLink from '@/app/components/Link';
import React from 'react';
import StatusBadge from '../components/StatusBadge';
import delay from 'delay';

const issuesPage = async () => {
	// retrieve issues without making axios/fetch request because this is a server component
	const issues = await prisma.issue.findMany();
	await delay(1000);

	return (
		<div>
			<div className="mb-4">
				<Button>
					<Link href={'/issues/new'}>Create New Issue</Link>
				</Button>
			</div>

			<Table.Root variant="surface">
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="hidden md:table-cell">
							Status
						</Table.ColumnHeaderCell>
						<Table.ColumnHeaderCell className="hidden md:table-cell">
							CreatedAt
						</Table.ColumnHeaderCell>
					</Table.Row>
				</Table.Header>

				<Table.Body>
					{issues.map((issue) => (
						<Table.Row key={issue.id}>
							<Table.RowHeaderCell>
								<CustomLink href={`/issues/${issue.id}`}>
									{issue.title}
								</CustomLink>
								<div className="md:hidden block">
									<StatusBadge status={issue.status} />
								</div>
							</Table.RowHeaderCell>
							<Table.Cell className="hidden md:table-cell">
								<StatusBadge status={issue.status} />
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								{issue.createdAt.toDateString()}
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

export default issuesPage;
