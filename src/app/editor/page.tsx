'use client'
import { SessionProvider } from 'next-auth/react'

import Editor from '@/modules/editor/components/Editor'
import { TopNav } from '@/modules/editor/components/TopNav'

export default function EditorPage() {
  return (
    <SessionProvider>
      <TopNav />
      <Editor />
    </SessionProvider>
  )
}
