import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Toaster } from '@/components/ui/sonner'
import { getAllPageSlugs, getPageContent } from '@/lib/db/page'
import { TopNav } from '@/modules/editor/components/TopNav'
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
        <div className="flex h-screen flex-col bg-background">
          <TopNav />
          {children}
          <Toaster richColors position="bottom-center" />
        </div>
      </EditorProvider>
    </AuthWrapper>
  )
}
