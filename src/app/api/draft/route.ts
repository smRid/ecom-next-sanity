import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

import { client } from '@/sanity/lib/client'
import { token } from '@/sanity/lib/token'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')

  if (!secret) {
    return new Response('Missing secret', { status: 401 })
  }

  if (!token) {
    return new Response('Missing token', { status: 401 })
  }

  const validationResult = await validatePreviewUrl(client.withConfig({ token }), request.url)

  if (!validationResult.isValid) {
    return new Response('Invalid secret', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()

  redirect(validationResult.redirectTo || '/')
}
