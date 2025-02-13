import { notFound } from 'next/navigation'
import RenderPage from '@/features/editor/RenderPage'
import { getPageContent, getAllPageSlugs } from '@/lib/db/page'

type Props = {
  params: { slug: string }
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const content = await getPageContent(slug)

  if (!content) return notFound()

  return <RenderPage content={content} />
}

export async function generateStaticParams() {
  return await getAllPageSlugs()
}

export const revalidate = 60
