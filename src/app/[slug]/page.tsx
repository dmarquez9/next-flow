import { JSONContent } from '@tiptap/react'
import { notFound } from 'next/navigation'

import { getPageContent, getAllPageSlugs } from '@/lib/db/page'
import RenderPage from '@/modules/editor/components/RenderPage'

type Props = {
  params: Promise<{
    slug: string
  }>
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const content = await getPageContent(slug)

  if (!content) return notFound()

  return <RenderPage content={content as JSONContent} />
}

export async function generateStaticParams() {
  return await getAllPageSlugs()
}

export const revalidate = 60
