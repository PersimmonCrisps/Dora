import { defineCollection, z } from 'astro:content';

const activitiesCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		date: z.string(),
		rawDate: z.string().or(z.date()),
		image: z.string(),
		description: z.string(),
		featured: z.boolean().default(false),
		gallery: z.array(z.string()).optional().default([]),
	}),
});

export const collections = {
	'activities': activitiesCollection,
};
