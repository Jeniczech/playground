import type { GlobalConfig } from 'payload'

export const Hero: GlobalConfig = {
  slug: 'hero',
  access: {
    read: () => true,
    update: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      required: true,
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'appStoreUrl',
      label: 'App Store URL',
      type: 'text',
      required: true,
    },
    {
      name: 'googlePlayUrl',
      label: 'Google Play URL',
      type: 'text',
      required: true,
    },
    {
      name: 'note',
      type: 'text',
      required: true,
      admin: {
        description: 'Short line shown next to the footprints icon.',
      },
    },
    {
      name: 'tag',
      type: 'text',
      required: true,
      admin: {
        description: 'Yellow tag under the Golem in the illustration.',
      },
    },
  ],
}
