import React from 'react';
import Skeleton from '@/app/components/Skeleton';
import { Table } from '@radix-ui/themes';
import CreateIssueButton from './CreateIssueButton';

const issues = [1, 2, 3, 4, 5];

const IssueLoader = () => {
	return (
		<div>
			<CreateIssueButton />
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
						<Table.Row key={issue}>
							<Table.RowHeaderCell>
								<Skeleton />
								<div className="md:hidden block">
									<Skeleton />
								</div>
							</Table.RowHeaderCell>
							<Table.Cell className="hidden md:table-cell">
								<Skeleton />
							</Table.Cell>
							<Table.Cell className="hidden md:table-cell">
								<Skeleton />
							</Table.Cell>
						</Table.Row>
					))}
				</Table.Body>
			</Table.Root>
		</div>
	);
};

export default IssueLoader;
