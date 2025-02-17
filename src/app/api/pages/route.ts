import { NextResponse } from 'next/server'

import { HTTP_STATUS } from '@/lib/constants'
import { prisma } from '@/lib/db/prisma'

export async function POST(req: Request) {
  try {
    const { content, slug } = await req.json()

    if (!slug || !content) {
      return NextResponse.json(
        { success: false, message: 'Missing slug or content.' },
        { status: HTTP_STATUS.BAD_REQUEST }
      )
    }

    // Check if the page already exists
    const existingPage = await prisma.page.findUnique({ where: { slug } })

    if (existingPage) {
      // Update existing page
      await prisma.page.update({
        where: { slug },
        data: { content },
      })
      return NextResponse.json(
        { success: true, message: 'Page updated successfully.' },
        { status: HTTP_STATUS.OK }
      )
    } else {
      // Create new page
      await prisma.page.create({
        data: { slug, content },
      })
      return NextResponse.json(
        { success: true, message: 'Page created successfully.' },
        { status: HTTP_STATUS.CREATED }
      )
    }
  } catch (error) {
    console.error('Error saving page:', error)
    return NextResponse.json(
      { success: false, message: 'Server error.' },
      { status: HTTP_STATUS.INTERNAL_SERVER_ERROR }
    )
  }
}
