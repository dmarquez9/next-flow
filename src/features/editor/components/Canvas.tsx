'use client'

import React, { useMemo, useCallback } from 'react'
import { createEditor, Descendant } from 'slate'
import { Slate, Editable, withReact } from 'slate-react'
import { withHistory } from 'slate-history'

const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [{ text: '¡Escribe algo increíble aquí!' }],
  },
  {
    type: 'heading',
    level: 1,
    children: [{ text: 'Este es un encabezado' }],
  },
]

const Canvas: React.FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  // @ts-expect-error: Unreachable code error
  const renderElement = useCallback((props) => {
    const { attributes, children, element } = props
    switch (element.type) {
      case 'heading':
        return React.createElement(`h${element.level}`, attributes, children)
      case 'paragraph':
      default:
        return <p {...attributes}>{children}</p>
    }
  }, [])

  // @ts-expect-error: Unreachable code error
  const renderLeaf = useCallback((props) => {
    const { attributes, children, leaf } = props

    let content = children

    if (leaf.bold) {
      content = <strong>{content}</strong>
    }

    if (leaf.italic) {
      content = <em>{content}</em>
    }

    if (leaf.underline) {
      content = <u>{content}</u>
    }

    if (leaf.code) {
      content = <code>{content}</code>
    }

    return <span {...attributes}>{content}</span>
  }, [])

  return (
    <Slate
      editor={editor}
      initialValue={initialValue}
      onChange={(value) => console.log(value)}
    >
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Escribe aquí..."
        className="p-4 border rounded"
      />
    </Slate>
  )
}

export default Canvas
