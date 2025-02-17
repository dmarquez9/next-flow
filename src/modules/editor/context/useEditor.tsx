'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useRef,
} from 'react'
import { Descendant } from 'slate'
import { toast } from 'sonner'

// Define the Context Type
type EditorContextType = {
  currentPage: string
  currentContent: Descendant[]
  isSaving: boolean
  pages: string[]
  setPage: (slug: string) => void
  savePageContent: () => Promise<void>
  setContent: (content: Descendant[]) => void
}

type EditorProviderProps = {
  children: ReactNode
  pages: string[]
  initialPage: string
  initialContent: Descendant[]
}

// Create Context
const EditorContext = createContext<EditorContextType | undefined>(undefined)

// Provider Component
export function EditorProvider({
  children,
  pages,
  initialPage,
  initialContent,
}: EditorProviderProps) {
  const [currentPage, setCurrentPage] = useState<string>(initialPage)
  const [currentContent, setCurrentContent] =
    useState<Descendant[]>(initialContent)
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
      setCurrentContent([])
      return
    }

    const fetchContent = async () => {
      try {
        const response = await fetch(`/api/pages/${currentPage}`)
        const data = await response.json()

        if (!response.ok) throw new Error(data.message)

        setCurrentContent(data.content || [])
      } catch (error) {
        console.error('Error fetching page content:', error)
      }
    }

    fetchContent()
  }, [currentPage])

  const savePageContent = async () => {
    if (!currentPage) return
    setIsSaving(true)
    try {
      const response = await fetch('/api/pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: currentPage, content: currentContent }),
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
    <EditorContext.Provider
      value={{
        currentPage,
        currentContent,
        isSaving,
        setPage,
        savePageContent,
        setContent: setCurrentContent,
        pages,
      }}
    >
      {children}
    </EditorContext.Provider>
  )
}

export function useEditor() {
  const context = useContext(EditorContext)
  if (!context)
    throw new Error('useEditor must be used within an EditorProvider')
  return context
}
