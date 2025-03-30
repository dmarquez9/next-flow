import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { ThemeProvider } from '@/components/ThemeProvider'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { authOptions } from '@/lib/authOptions'
import { getAllPageSlugs, getPageContent } from '@/lib/db/page'
import EditorSidebar from '@/modules/editor/components/EditorSidebar'
import { StyleSidebar } from '@/modules/editor/components/StyleSidebar'
import { CurrentNodeProvider } from '@/modules/editor/context/useCurrentNode'
import { EditorPageProvider } from '@/modules/editor/context/useEditorPage'
import { PageProvider } from '@/modules/editor/context/usePage'
import AuthWrapper from '@/modules/login/components/AuthWrapper'

import './editor_classes.css'

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
        <PageProvider
          pages={pagesSlugs.map((page) => page.slug)}
          initialPage={initialPage}
          initialContent={initialPageContent}
        >
          <SidebarProvider>
            <EditorPageProvider>
              <CurrentNodeProvider>
                <EditorSidebar />
                <SidebarInset>
                  <div className="hidden __load-spacing" />
                  {children}
                </SidebarInset>
                <StyleSidebar />
              </CurrentNodeProvider>
            </EditorPageProvider>
          </SidebarProvider>
        </PageProvider>
        <Toaster richColors position="bottom-center" />
      </ThemeProvider>
    </AuthWrapper>
  )
}
