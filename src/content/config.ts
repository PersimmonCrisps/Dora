import { defineCollection, z } from 'astro:content';

const activitiesCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.string(),
		rawDate: z.string(),
		image: z.string(), // Back to filename string for easier maintenance
		featured: z.boolean().default(false),
		gallery: z.array(z.string()).optional(),
	}),
});

export const collections = {
	activities: activitiesCollection,
};
