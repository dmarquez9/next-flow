import { TopNav } from '@/components/TopNav'

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen flex-col bg-background">
      <TopNav />
      {children}
    </div>
  )
}
