import { NextResponse } from 'next/server'

import { HTTP_STATUS } from '@/lib/constants'
import { prisma } from '@/lib/db/prisma'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    if (!slug) {
      return NextResponse.json(
        { success: false, message: 'Missing slug parameter.' },
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    // Fetch page content by slug
    const page = await prisma.page.findUnique({
      where: { slug },
    })

    if (!page) {
      return NextResponse.json(
        { success: false, message: 'Page not found.' },
        { status: HTTP_STATUS.NOT_FOUND }
      )
    }

    return NextResponse.json(
      { success: true, content: page.content },
      { status: HTTP_STATUS.OK }
    )
  } catch (error) {
    console.error('Error fetching page:', error)
    return NextResponse.json(
      { success: false, message: 'Server error.' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    )
  }
}
