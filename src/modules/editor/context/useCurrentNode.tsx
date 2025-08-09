'use client'

import { createContext, useContext, useEffect, useState } from 'react'

import { Attrs } from '@tiptap/pm/model'
import { Node as ProseMirrorNode } from 'prosemirror-model'

import { NODE_ATTRS_UPDATED_EVENT } from '../events/nodeAttrsUpdated'

import { useEditorPage } from './useEditorPage'

type UseCurrentNodeResult = {
  node: ProseMirrorNode | null
  attributes: Attrs
  type: string | null
  isActive: boolean
}

const defaultResult: UseCurrentNodeResult = {
  node: null,
  attributes: {},
  type: null,
  isActive: false,
}

const CurrentNodeContext = createContext<UseCurrentNodeResult>(defaultResult)

export const useCurrentNode = () => {
  const context = useContext(CurrentNodeContext)
  if (!context) {
    throw new Error('useCurrentNode must be used within an CurrentNodeProvider')
  }
  return context
}

export const CurrentNodeProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { editor } = useEditorPage()
  const [result, setResult] = useState<UseCurrentNodeResult>(defaultResult)

  useEffect(() => {
    if (!editor) return

    const updateSelection = () => {
      try {
        if (!editor.isActive) {
          setResult(defaultResult)
          return
        }

        const resolved = editor.state.selection.$from
        const node = resolved.node(resolved.depth)
        const attributes = editor.getAttributes(node.type.name)

        setResult({
          node,
          attributes,
          type: node.type.name,
          isActive: true,
        })
      } catch (error) {
        console.error('Error getting current node:', error)
        setResult(defaultResult)
      }
    }

    updateSelection()
    editor.on('selectionUpdate', updateSelection)
    window.addEventListener(NODE_ATTRS_UPDATED_EVENT, updateSelection)

    return () => {
      editor.off('selectionUpdate', updateSelection)
      window.removeEventListener(NODE_ATTRS_UPDATED_EVENT, updateSelection)
    }
  }, [editor])

  return (
    <CurrentNodeContext.Provider value={result}>
      {children}
    </CurrentNodeContext.Provider>
  )
}
