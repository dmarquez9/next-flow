import { TopNav } from '@/features/editor/components/TopNav'
import { EditorProvider } from '@/features/editor/context/useEditor'

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <EditorProvider>
      <div className="flex h-screen flex-col bg-background">
        <TopNav />
        {children}
      </div>
    </EditorProvider>
  )
}
