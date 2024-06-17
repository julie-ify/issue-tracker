import { z } from 'zod';

export const createIssueSchema = z.object({
	title: z.string().min(5).max(255),
	description: z.string().min(5),
});