import { getPayload, type Payload } from 'payload'
import type { User } from '@/payload-types'
import config from '@/payload.config'

import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'

let payload: Payload
let admin: User
let editor: User

describe('Users access', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  beforeEach(async () => {
    admin = await payload.create({
      collection: 'users',
      data: {
        email: 'access-admin@example.com',
        password: 'password',
        role: 'admin',
      },
    })

    editor = await payload.create({
      collection: 'users',
      data: {
        email: 'access-editor@example.com',
        password: 'password',
        role: 'editor',
      },
    })
  })

  afterEach(async () => {
    await payload.delete({
      collection: 'users',
      where: {
        email: {
          in: ['access-admin@example.com', 'access-editor@example.com'],
        },
      },
    })
  })

  it('prevents an editor from reading another user', async () => {
    const result = await payload.find({
      collection: 'users',
      user: editor,
      overrideAccess: false,
    })

    expect(result.docs).toHaveLength(1)
    expect(result.docs[0]?.id).toBe(editor.id)
    expect(result.docs.find((user) => user.id === admin.id)).toBeUndefined()
  })

  it('allows an admin to read all users', async () => {
    const result = await payload.find({
      collection: 'users',
      user: admin,
      overrideAccess: false,
    })

    expect(result.docs.map((user) => user.id)).toContain(admin.id)
    expect(result.docs.map((user) => user.id)).toContain(editor.id)
  })

  it('prevents an editor from creating a user', async () => {
    await expect(
      payload.create({
        collection: 'users',
        data: {
          email: 'another-editor@example.com',
          password: 'password',
          role: 'editor',
        },
        user: editor,
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })

  it('prevents an editor from deleting another user', async () => {
    await expect(
      payload.delete({
        collection: 'users',
        id: admin.id,
        user: editor,
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })

  it('prevents an editor from promoting themselves to admin', async () => {
    const updatedUser = await payload.update({
      collection: 'users',
      id: editor.id,
      data: {
        role: 'admin',
      },
      user: editor,
      overrideAccess: false,
    })

    expect(updatedUser.role).toBe('editor')
  })

  it('allows an admin to change another users role', async () => {
    const updatedUser = await payload.update({
      collection: 'users',
      id: editor.id,
      data: {
        role: 'admin',
      },
      user: admin,
      overrideAccess: false,
    })

    expect(updatedUser.role).toBe('admin')
  })
})
