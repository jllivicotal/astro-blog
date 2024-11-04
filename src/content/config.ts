import { defineCollection, reference, z } from "astro:content";

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    image: image().refine( img => img.width < 1200, {
      message: 'The image width must be less than 1200px'
    }),

    // Relacion
    author: reference('author'),

    // Relacion
    tags: z.array(z.string()),

    // Boolean
    isDraft: z.boolean().default(false),
  }),
});

const authorCollection = defineCollection({
  type: 'data',
  schema: ({image}) => z.object({
    name: z.string(),
    twitter: z.string(),
    linkedIn: z.string(),
    github: z.string(),
    bio: z.string(),
    subtitle: z.string(),
    avatar: image().refine( img => img.width < 1200, {
      message: 'The image width must be less than 1200px'
    }),
  }),
});

export const collections = {
  blog: blogCollection,
  author: authorCollection,
};
