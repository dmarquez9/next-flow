import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { ThemeProvider } from '@/components/ThemeProvider'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { authOptions } from '@/lib/authOptions'
import { getAllPageSlugs, getPageContent } from '@/lib/db/page'
import EditorSidebar from '@/modules/editor/components/EditorSidebar'
import { StyleSidebar } from '@/modules/editor/components/StyleSidebar'
import { CanvasProvider } from '@/modules/editor/context/useCanvas'
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
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <EditorProvider
          pages={pagesSlugs.map((page) => page.slug)}
          initialPage={initialPage}
          initialContent={initialPageContent}
        >
          <SidebarProvider>
            <CanvasProvider>
              <EditorSidebar />
              <SidebarInset>{children}</SidebarInset>
              <StyleSidebar />
            </CanvasProvider>
          </SidebarProvider>
        </EditorProvider>
        <Toaster richColors position="bottom-center" />
      </ThemeProvider>
    </AuthWrapper>
  )
}
