import { IconName } from 'lucide-react/dynamic'

const layerIcons = {
  paragraph: 'pilcrow',
} as const

export const getIconName = ({
  level,
  type,
}: {
  type: string
  level?: number
}) => {
  let icon =
    type in layerIcons ? layerIcons[type as keyof typeof layerIcons] : type

  if (type === 'heading' && level) {
    icon += '-' + level
  }

  return icon as IconName
}
