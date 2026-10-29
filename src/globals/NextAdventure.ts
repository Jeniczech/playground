import type { GlobalConfig } from 'payload'

export const NextAdventure: GlobalConfig = {
  slug: 'next-adventure',
  label: 'Next adventure',
  admin: {
    description: 'Download call to action and contact. The store links come from the Hero global.',
  },
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'guideHeading',
      type: 'text',
      required: true,
      admin: {
        description: 'Shown next to the Golem.',
      },
    },
    {
      name: 'guideDescription',
      type: 'textarea',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'text',
      required: true,
    },
    {
      name: 'contactHeading',
      type: 'text',
      required: true,
    },
    {
      name: 'contactEmail',
      type: 'email',
      required: true,
    },
  ],
}
