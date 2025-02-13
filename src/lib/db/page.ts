import { prisma } from './prisma'
import { Block } from '@/features/editor/types'

// 🔹 Fetch a single page by slug
export async function getPageContent(slug: string) {
  try {
    const page = await prisma.page.findUnique({ where: { slug } })

    return page ? (page.content as Block[]) : null
  } catch (error) {
    console.error('Error fetching page:', error)
    return null
  }
}

// 🔹 Fetch all slugs for static generation
export async function getAllPageSlugs() {
  try {
    const pages = await prisma.page.findMany({ select: { slug: true } })

    return pages.map((page) => ({ slug: page.slug }))
  } catch (error) {
    console.error('Error fetching slugs:', error)
    return []
  }
}
