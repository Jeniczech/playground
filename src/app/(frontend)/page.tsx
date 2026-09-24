import { RichText } from '@payloadcms/richtext-lexical/react'
import { getPayload } from 'payload'

import config from '@/payload.config'
import './styles.css'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const payload = await getPayload({ config })

  const posts = await payload.find({
    collection: 'posts',
    where: {
      published: {
        equals: true,
      },
    },
  })

  return (
    <main>
      <h1>Posts</h1>

      {posts.docs.map((post) => (
        <article key={post.id}>
          <h2>{post.title}</h2>

          {post.content && <RichText data={post.content} />}
        </article>
      ))}
    </main>
  )
}
