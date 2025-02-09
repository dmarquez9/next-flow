import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

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

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

export type Block = ParagraphElement | HeadingElement

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: Block
    Text: TextElement
  }
}
export type PageData = Record<string, Block[]>
