'use client'
import { EditorContent } from '@tiptap/react'

import { useCanvas } from '../context/useCanvas'

import EditorBubble from './EditorBubble'

const Canvas = () => {
  const { editor } = useCanvas()

  return (
    <>
      <EditorBubble />
      <EditorContent editor={editor} />
    </>
  )
}

export default Canvas
