import { Attrs } from '@tiptap/pm/model'
import { Editor } from '@tiptap/react'

import extensions from '@/components/extensions'

import { cn } from './utils'

const defaultHeadingLevel = 1

export const editorConfig = {
  immediatelyRender: false,
  extensions,
  editorProps: {
    attributes: {
      class:
        'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl focus:outline-none',
    },
  },
}

const toggleClass = (editor: Editor, className: string) => {
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

const updateNodeAttr = (editor: Editor, attrs: Attrs) => {
  const node = editor.state.selection.$anchor.parent
  editor.chain().focus().updateAttributes(node.type.name, attrs).run()
}

const changeNodeType = (editor: Editor, type: string, attrs: Attrs = {}) => {
  let nodeAttrs = attrs
  if (type === 'heading' && !attrs.level) {
    nodeAttrs = { ...nodeAttrs, level: defaultHeadingLevel }
  }
  editor.chain().focus().setNode(type, nodeAttrs).run()
}

export const editorUtils = {
  toggleClass,
  updateNodeAttr,
  changeNodeType,
}
