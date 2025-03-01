import { JSONContent } from '@tiptap/react'

export type TextElement = {
  text: string
  bold?: boolean
  italic?: boolean
}

export type ParagraphElement = {
  type: 'paragraph'
  children: TextElement[]
}

export type HeadingElement = {
  type: 'heading'
  level: number
  children: TextElement[]
}

export type PageData = Record<string, JSONContent>
