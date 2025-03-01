import { JSONContent } from '@tiptap/react'
import { IconName } from 'lucide-react/dynamic'

const layerIcons = {
  paragraph: 'pilcrow',
} as const

export const getIconName = ({ type }: JSONContent) => {
  if (!type) {
    return 'pilcrow'
  }

  const icon =
    type in layerIcons ? layerIcons[type as keyof typeof layerIcons] : type

  return icon as IconName
}
