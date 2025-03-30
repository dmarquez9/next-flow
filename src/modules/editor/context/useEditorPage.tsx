'use client'

import { createContext, useContext, useEffect, useRef } from 'react'

import { Attrs } from '@tiptap/pm/model'
import { useEditor as useTipTapEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import Heading from '@/components/extensions/Heading'
import Spacing from '@/components/extensions/Spacing'
import { cn } from '@/lib/utils'

import { usePage } from './usePage'

interface EditorPageContextType {
  editor: Editor
  toggleClass: (className: string) => void
  updateNodeAttr: (key: string, value: string) => void
  changeNodeType: (type: string, attrs?: Attrs) => void
}

const defaultHeadingLevel = 1

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
    immediatelyRender: false,
    extensions: [Heading, StarterKit.configure({ heading: false }), Spacing],
    editorProps: {
      attributes: {
        class:
          'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none',
      },
    },
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

  const toggleClass = (className: string) => {
    const node = editor.state.selection.$anchor.parent
    const currentClass = node.attrs.class || ''
    const hasClass = currentClass.includes(className)

    const newClass = hasClass
      ? currentClass.replace(className, '').trim()
      : `${currentClass} ${className}`.trim()

    editor
      .chain()
      .focus()
      .updateAttributes(node.type.name, { class: cn(newClass) })
      .run()
  }

  const updateNodeAttr = (key: string, value: string) => {
    const node = editor.state.selection.$anchor.parent

    editor
      .chain()
      .focus()
      .updateAttributes(node.type.name, { [key]: value })
      .run()
  }

  const changeNodeType = (type: string, attrs: Attrs = {}) => {
    let nodeAttrs = attrs
    if (type === 'heading' && !attrs.level) {
      nodeAttrs = { ...nodeAttrs, level: defaultHeadingLevel }
    }
    editor.chain().focus().setNode(type, nodeAttrs).run()
  }

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
