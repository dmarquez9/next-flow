'use client'

import { createContext, useContext, useEffect, useRef } from 'react'

import { useEditor as useTipTapEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { useEditor } from './useEditor'

interface CanvasContextType {
  editor: Editor
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined)

export const CanvasProvider = ({ children }: { children: React.ReactNode }) => {
  const { currentContent, setContent } = useEditor()
  const isInitialRender = useRef<boolean>(true)

  const editor = useTipTapEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none',
      },
    },
    content: currentContent,
    onUpdate: ({ editor }) => {
      console.log('🚀 ~ Canvas ~ editor.getJSON():', editor.getJSON())
      setContent(editor.getJSON())
    },
  })

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (editor && !editor.isDestroyed) {
      editor.commands.setContent(currentContent)
    }
  }, [editor, currentContent])

  if (!editor) {
    return null
  }

  return (
    <CanvasContext.Provider value={{ editor }}>
      {children}
    </CanvasContext.Provider>
  )
}

export const useCanvas = () => {
  const context = useContext(CanvasContext)
  if (!context) {
    throw new Error('useCanvas must be used within an CanvasProvider')
  }
  return context
}
