import { BaseEditor, Descendant } from 'slate'
import { ReactEditor } from 'slate-react'
import { HistoryEditor } from 'slate-history'

export type ParagraphElement = {
  type: 'paragraph'
  children: Descendant[]
}

export type HeadingElement = {
  type: 'heading'
  level: number
  children: Descendant[]
}

export type CustomElement = ParagraphElement | HeadingElement
export type CustomText = { text: string; bold?: boolean; italic?: boolean }

export type CustomEditor = BaseEditor & ReactEditor & HistoryEditor

declare module 'slate' {
  interface CustomTypes {
    Editor: CustomEditor
    Element: CustomElement
    Text: CustomText
  }
}
