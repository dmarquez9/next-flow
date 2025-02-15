'use client'

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react'
import { getPageContent } from '@/lib/db/page' // Function to fetch content from API or DB
import { Block } from '../types'

// Define the Context Type
type EditorContextType = {
  currentPage: string
  currentContent: Block[]
  setPage: (slug: string) => void
}

// Create Context
const EditorContext = createContext<EditorContextType | undefined>(undefined)

// Provider Component
export function EditorProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<string>('')
  const [currentContent, setCurrentContent] = useState<Block[]>([])

  const setPage = (slug: string) => {
    setCurrentPage(slug)
  }

  useEffect(() => {
    if (!currentPage) {
      setCurrentContent([])
      return
    }

    const fetchContent = async () => {
      const content = await getPageContent(currentPage)
      setCurrentContent(content || [])
    }

    fetchContent()
  }, [currentPage])

  return (
    <EditorContext.Provider value={{ currentPage, currentContent, setPage }}>
      {children}
    </EditorContext.Provider>
  )
}

// Custom Hook
export function useEditor() {
  const context = useContext(EditorContext)
  if (!context)
    throw new Error('useEditor must be used within an EditorProvider')
  return context
}
