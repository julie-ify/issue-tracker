import { z } from 'zod';

export const IssueSchema = z.object({
	title: z.string().min(3, 'Title must be more than 3 chars').max(255),
	description: z.string().min(3, 'Description must be more than 3 chars'),
});

export const userSchema = z.object({
	name: z.string().min(5),
	email: z.string().min(5),
	password: z.string().min(5)
})
