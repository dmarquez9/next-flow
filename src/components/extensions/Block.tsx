import { Node, mergeAttributes } from '@tiptap/core'

const Block = Node.create({
  name: 'divBlock',

  group: 'block',

  content: 'block+',

  parseHTML() {
    return [
      {
        tag: 'div',
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes), 0]
  },

  addAttributes() {
    return {
      class: {
        default: null,
      },
      id: {
        default: null,
      },
    }
  },
})

export default Block
