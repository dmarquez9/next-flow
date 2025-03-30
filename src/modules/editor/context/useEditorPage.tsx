'use client'

import { createContext, useContext, useEffect, useRef } from 'react'

import { Attrs } from '@tiptap/pm/model'
import { useEditor as useTipTapEditor, Editor } from '@tiptap/react'

import { editorConfig, editorUtils } from '@/lib/editor'

import { usePage } from './usePage'

interface EditorPageContextType {
  editor: Editor
  toggleClass: (className: string) => void
  updateNodeAttr: (attrs: Attrs) => void
  changeNodeType: (type: string, attrs?: Attrs) => void
}

const EditorPageContext = createContext<EditorPageContextType | undefined>(
  undefined
)

export const EditorPageProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { initialContent } = usePage()
  const isInitialRender = useRef<boolean>(true)

  const editor = useTipTapEditor({
    ...editorConfig,
    content: initialContent,
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

  const toggleClass = (className: string) =>
    editorUtils.toggleClass(editor, className)

  const updateNodeAttr = (attrs: Attrs) =>
    editorUtils.updateNodeAttr(editor, attrs)

  const changeNodeType = (type: string, attrs: Attrs = {}) =>
    editorUtils.changeNodeType(editor, type, attrs)

  return (
    <EditorPageContext.Provider
      value={{ editor, toggleClass, updateNodeAttr, changeNodeType }}
    >
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
