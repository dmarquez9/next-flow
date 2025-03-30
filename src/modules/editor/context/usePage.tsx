'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from 'react'

import { JSONContent } from '@tiptap/react'
import { toast } from 'sonner'

// Define the Context Type
type PageContextType = {
  currentPage: string
  initialContent: JSONContent
  isSaving: boolean
  pages: string[]
  setPage: (slug: string) => void
  savePageContent: (content: JSONContent) => Promise<void>
}

type PageProviderProps = {
  children: ReactNode
  pages: string[]
  initialPage: string
  initialContent: JSONContent
}

// Create Context
const PageContext = createContext<PageContextType | undefined>(undefined)

// Provider Component
export function PageProvider({
  children,
  initialContent: initialRenderContent,
  initialPage,
  pages,
}: PageProviderProps) {
  const [currentPage, setCurrentPage] = useState<string>(initialPage)
  const [initialContent, setInitialContent] =
    useState<JSONContent>(initialRenderContent)
  const [isSaving, setIsSaving] = useState<boolean>(false)
  const isInitialRender = useRef(true)

  const setPage = (slug: string) => {
    setCurrentPage(slug)
  }

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (!currentPage) {
      return
    }

    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/pages/${currentPage}`)
        const data = await response.json()

        if (!response.ok) throw new Error(data.message)

        setInitialContent(data.content || {})
      } catch (error) {
        console.error('Error fetching page content:', error)
      }
    }

    fetchContent()
  }, [currentPage])

  const savePageContent = async (content: JSONContent) => {
    if (!currentPage) return
    setIsSaving(true)
    try {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: currentPage, content }),
      })

      const data = await response.json()
      if (!response.ok) throw new Error(data.message || 'Failed to save page')

      console.log('Page saved:', data)
      toast.success('Page saved successfully! 🎉')
    } catch (error) {
      console.error('Error saving page:', error)
      toast.error('Failed to save page. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <PageContext.Provider
      value={{
        currentPage,
        initialContent,
        isSaving,
        setPage,
        savePageContent,
        pages,
      }}
    >
      {children}
    </PageContext.Provider>
  )
}

export function usePage() {
  const context = useContext(PageContext)
  if (!context) throw new Error('usePage must be used within an PageProvider')
  return context
}
