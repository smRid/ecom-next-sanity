import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production', // Disable CDN in development for draft mode

  stega: {
    studioUrl: process.env.NODE_ENV === 'production'
      ? 'https://shopinity-smr.vercel.app/studio'
      : `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/studio`,
  },
})
