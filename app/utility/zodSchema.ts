import { z } from 'zod';

export const IssueSchema = z.object({
	title: z.string().min(3, 'Title must be atleast 3 chars').max(255),
	description: z
		.string()
		.min(3, 'Description must be atleast 3 chars')
		.max(65500),
});

export const PatchIssueSchema = z.object({
	title: z.string().min(3, 'Title must be atleast 3 chars').max(255).optional(),
	description: z
		.string()
		.min(3, 'Description must be atleast 3 chars')
		.max(65500)
		.optional(),
	assignedToUserId: z
		.string()
		.min(1, 'AssignedToUserId is required')
		.max(255)
		.optional()
		.nullable(),
});

export const signupSchema = z.object({
	name: z.string().min(5),
	email: z.string().min(5),
	password: z.string().min(5),
});

export const signinSchema = z.object({
	email: z.string().min(5),
	password: z.string().min(5),
});
