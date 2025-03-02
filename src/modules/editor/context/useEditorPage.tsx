'use client'

import { createContext, useContext, useEffect, useRef } from 'react'

import { useEditor as useTipTapEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import { usePage } from './usePage'

interface EditorPageContextType {
  editor: Editor
}

const EditorPageContext = createContext<EditorPageContextType | undefined>(
  undefined
)

export const EditorPageProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { initialContent, setContent } = usePage()
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
    content: initialContent,
    onUpdate: ({ editor }) => {
      console.log('🚀 ~ EditorPage ~ editor.getJSON():', editor.getJSON())
      setContent(editor.getJSON())
    },
  })

  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (editor && !editor.isDestroyed) {
      editor.commands.setContent(initialContent)
    }
  }, [editor, initialContent])

  if (!editor) {
    return null
  }

  return (
    <EditorPageContext.Provider value={{ editor }}>
      {children}
    </EditorPageContext.Provider>
  )
}

export const useEditorPage = () => {
  const context = useContext(EditorPageContext)
  if (!context) {
    throw new Error('useEditorPage must be used within an EditorPageProvider')
  }
  return context
}
