import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('How it works global access', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('can be read anonymously', async () => {
    await expect(
      payload.findGlobal({ slug: 'how-it-works', overrideAccess: false }),
    ).resolves.toBeDefined()
  })

  it('cannot be updated anonymously', async () => {
    await expect(
      payload.updateGlobal({
        slug: 'how-it-works',
        data: { title: 'Changed' },
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })
})
