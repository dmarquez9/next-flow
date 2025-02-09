import RenderPage from '@/features/editor/RenderPage'
import { Block, PageData } from '@/features/editor/types'
import { notFound } from 'next/navigation'

type Props = {
  params: { slug: string }
}

const pageData: PageData = {
  home: [
    {
      type: 'paragraph',
      children: [{ text: '¡Escribe algo increíble aquí!' }],
    },
    {
      type: 'heading',
      level: 1,
      children: [{ text: 'Este es un encabezado' }],
    },
  ],
  about: [
    {
      type: 'paragraph',
      children: [{ text: 'Bienvenido a la página About.' }],
    },
    { type: 'heading', level: 2, children: [{ text: 'Conócenos mejor' }] },
  ],
}

async function getPageContent(slug: string): Promise<Block[] | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(pageData[slug] || null)
    }, 500) // Simulación de un delay de 500ms (como si fuera una API)
  })
}

export default async function Page({ params }: Props) {
  const { slug } = await params
  const content = await getPageContent(slug)

  if (!content) return notFound()

  return <RenderPage content={content} />
}

export async function generateStaticParams() {
  return Object.keys(pageData).map((slug) => ({ slug }))
}

export const revalidate = 60
