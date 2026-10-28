import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('Hero global access', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('can be read anonymously', async () => {
    await expect(payload.findGlobal({ slug: 'hero', overrideAccess: false })).resolves.toBeDefined()
  })

  it('cannot be updated anonymously', async () => {
    await expect(
      payload.updateGlobal({
        slug: 'hero',
        data: { heading: 'Changed' },
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })
})
