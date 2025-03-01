import { JSONContent } from '@tiptap/react'

import { prisma } from './prisma'

// 🔹 Fetch a single page by slug
export async function getPageContent(slug: string) {
  try {
    const page = await prisma.page.findUnique({
      where: { slug },
      select: { content: true },
    })

    return page ? (page.content as JSONContent) : {}
  } catch (error) {
    console.error('Error fetching page:', error)
    return []
  }
}

// 🔹 Fetch all slugs for static generation
export async function getAllPageSlugs() {
  try {
    const pages = await prisma.page.findMany({
      select: { slug: true },
      orderBy: { id: 'asc' },
    })

    return pages.map((page) => ({ slug: page.slug }))
  } catch (error) {
    console.error('Error fetching slugs:', error)
    return []
  }
}
