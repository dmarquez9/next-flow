'use client'

import React, { useMemo, useCallback, useState, useEffect } from 'react'

import { createEditor, Descendant } from 'slate'
import { withHistory } from 'slate-history'
import { Slate, Editable, withReact } from 'slate-react'

import { useEditor } from '../context/useEditor'

const Canvas: React.FC = () => {
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const { currentContent, setContent } = useEditor()
  const [localValue, setLocalValue] = useState(currentContent)

  useEffect(() => {
    setLocalValue(currentContent)
  }, [currentContent])

  const handleChange = useCallback(
    (value: Descendant[]) => [setContent(value), setLocalValue(value)],
    [setContent]
  )

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
      initialValue={localValue}
      onValueChange={handleChange}
      key={JSON.stringify(localValue)}
    >
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        placeholder="Escribe aquí..."
        className="focus:outline-none"
      />
    </Slate>
  )
}

export default Canvas
