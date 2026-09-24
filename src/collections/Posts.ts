import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',

  admin: {
    useAsTitle: 'title',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'content',
      type: 'richText',
    },
    {
      name: 'published',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
    },
  ],

  access: {
    read: ({ req }) => {
      if (req.user) {
        return true
      }

      return {
        published: {
          equals: true,
        },
      }
    },
  },
}
