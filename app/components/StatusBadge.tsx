import { Status } from '@prisma/client';
import { Badge } from '@radix-ui/themes';
import React from 'react';

interface Props {
	status: Status;
}

const statusMap: Record<
	Status,
	{ label: string; color: 'red' | 'violet' | 'green' }
> = {
	OPEN: { label: 'Open', color: 'green' },
	IN_PROGRESS: { label: 'In Progress', color: 'violet' },
	CLOSED: { label: 'Closed', color: 'red' },
};

const StatusBadge = ({ status }: Props) => {
	return (
		<Badge color={statusMap[status].color} size={'3'}>{statusMap[status].label}</Badge>
	);
};

export default StatusBadge;
