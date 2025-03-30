import { JSX } from 'react'

import { JSONContent } from '@tiptap/react'

import { cn, renderNodeAttrs } from '@/lib/utils'

type TKey = string | number

function renderContent(block: JSONContent, key: TKey) {
  switch (block.type) {
    case 'text': {
      if (block.marks && block.marks.length > 0) {
        const marksType = block.marks.map((mark) => mark.type)
        return (
          <span
            key={key}
            className={cn({
              'font-bold': marksType.includes('bold'),
              italic: marksType.includes('italic'),
              underline: marksType.includes('strike'),
            })}
          >
            {block.text}
          </span>
        )
      }
      return block.text
    }
    case 'paragraph':
      return (
        <p key={key} {...renderNodeAttrs(block)}>
          {block.content?.map((content, index) =>
            renderContent(content, `${block.type}-${key}-${index}`)
          )}
        </p>
      )

    case 'heading': {
      const HeadingTag = `h${
        block.attrs?.level || 1
      }` as keyof JSX.IntrinsicElements
      return (
        <HeadingTag key={key} {...renderNodeAttrs(block)}>
          {block.content?.map((content, index) =>
            renderContent(content, `${block.type}-${key}-${index}`)
          )}
        </HeadingTag>
      )
    }

    default:
      return null
  }
}

export default function RenderPage({ content }: { content: JSONContent }) {
  return (
    <>
      {content.content?.map((block: JSONContent, i: number) =>
        renderContent(block, i)
      )}
    </>
  )
}
