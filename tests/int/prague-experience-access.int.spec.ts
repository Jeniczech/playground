import { getPayload, Payload } from 'payload'
import config from '@/payload.config'

import { describe, it, beforeAll, expect } from 'vitest'

let payload: Payload

describe('Prague experience global access', () => {
  beforeAll(async () => {
    const payloadConfig = await config
    payload = await getPayload({ config: payloadConfig })
  })

  it('can be read anonymously', async () => {
    await expect(
      payload.findGlobal({ slug: 'prague-experience', overrideAccess: false }),
    ).resolves.toBeDefined()
  })

  it('cannot be updated anonymously', async () => {
    await expect(
      payload.updateGlobal({
        slug: 'prague-experience',
        data: { title: 'Changed' },
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })
})
