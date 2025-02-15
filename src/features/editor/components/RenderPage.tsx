import { JSX } from 'react'
import { Block, TextElement } from '../types'

function renderContent(block: Block, key: number) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p key={key}>
          {block.children.map((child: TextElement) => child.text).join('')}
        </p>
      )

    case 'heading': {
      const HeadingTag = `h${block.level}` as keyof JSX.IntrinsicElements
      return (
        <HeadingTag key={key}>
          {block.children.map((child: TextElement) => child.text).join('')}
        </HeadingTag>
      )
    }

    default:
      return null
  }
}

export default function RenderPage({ content }: { content: Block[] }) {
  return (
    <>{content.map((block: Block, i: number) => renderContent(block, i))}</>
  )
}
