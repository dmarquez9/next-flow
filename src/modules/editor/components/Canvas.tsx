'use client'
import { EditorContent } from '@tiptap/react'

import { useEditorPage } from '../context/useEditorPage'

import EditorBubble from './EditorBubble'

const Canvas = () => {
  const { editor } = useEditorPage()

  return (
    <>
      <EditorBubble />
      <EditorContent editor={editor} />
    </>
  )
}

export default Canvas
