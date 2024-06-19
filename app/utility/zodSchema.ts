import { z } from 'zod';

export const IssueSchema = z.object({
	title: z.string().min(3, 'Title must be more than 3 chars').max(255),
	description: z.string().min(3, 'Description must be more than 3 chars'),
});
