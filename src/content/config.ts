import { defineCollection, z } from 'astro:content';

const activitiesCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		date: z.string(),
		rawDate: z.string(),
		image: z.string(),
		featured: z.boolean().default(false),
		gallery: z.array(z.string()).optional(),
		draft: z.boolean().optional(), // Added for Practice / Hidden mode
	}),
});

export const collections = {
	activities: activitiesCollection,
};
