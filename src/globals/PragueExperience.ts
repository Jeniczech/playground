import type { GlobalConfig } from 'payload'

export const PragueExperience: GlobalConfig = {
  slug: 'prague-experience',
  label: 'Prague experience',
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
      name: 'features',
      type: 'array',
      required: true,
      minRows: 1,
      fields: [
        {
          name: 'icon',
          type: 'select',
          required: true,
          options: [
            { label: 'Eye', value: 'eye' },
            { label: 'Flag', value: 'flag' },
            { label: 'Key', value: 'key' },
            { label: 'Diamond', value: 'diamond' },
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
    {
      name: 'galleryLabel',
      type: 'text',
      required: true,
      admin: {
        description: 'Small uppercase line above the gallery heading.',
      },
    },
    {
      name: 'galleryHeading',
      type: 'text',
      required: true,
    },
    {
      name: 'screenshots',
      type: 'array',
      required: true,
      minRows: 1,
      admin: {
        description: 'Captions under the phone previews, in order.',
      },
      fields: [
        {
          name: 'screen',
          type: 'select',
          options: [
            { label: 'Explore hunts', value: 'explore-hunts' },
            { label: 'Live hunt', value: 'live-hunt' },
          ],
          admin: {
            description: 'App screen shown in the phone. Leave empty for a blank phone.',
          },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
