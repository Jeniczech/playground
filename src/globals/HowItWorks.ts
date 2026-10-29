import type { GlobalConfig } from 'payload'

export const HowItWorks: GlobalConfig = {
  slug: 'how-it-works',
  label: 'How it works',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'label',
      type: 'text',
      required: true,
      admin: {
        description: 'Small uppercase line on the right of the title.',
      },
    },
    {
      name: 'steps',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Steps are numbered automatically in this order.',
      },
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Flag', value: 'flag' },
            { label: 'Map', value: 'map' },
            { label: 'Question', value: 'question' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
}
