import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { authOptions } from '@/lib/authOptions'
import { getAllPageSlugs, getPageContent } from '@/lib/db/page'
import EditorSidebar from '@/modules/editor/components/EditorSidebar'
import { StyleSidebar } from '@/modules/editor/components/StyleSidebar'
import { EditorProvider } from '@/modules/editor/context/useEditor'
import AuthWrapper from '@/modules/login/components/AuthWrapper'

export default async function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/login')
  }

  const pagesSlugs = await getAllPageSlugs()

  const initialPage = pagesSlugs[0]?.slug || ''
  const initialPageContent = await getPageContent(initialPage)

  return (
    <AuthWrapper>
      <EditorProvider
        pages={pagesSlugs.map((page) => page.slug)}
        initialPage={initialPage}
        initialContent={initialPageContent}
      >
        <SidebarProvider>
          <EditorSidebar />
          <SidebarInset>
            {children}
            <Toaster richColors position="bottom-center" />
          </SidebarInset>
          <StyleSidebar />
        </SidebarProvider>
      </EditorProvider>
    </AuthWrapper>
  )
}
