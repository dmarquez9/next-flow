import { Extension } from '@tiptap/core'

import { DEFAULT_SPACING } from '@/lib/constants'
import spacing from '@/lib/tailwindSpacing'
import { cn } from '@/lib/utils'
import { TSpacingKey } from '@/types'

const spacingAttrs: TSpacingKey[] = [
  'mt',
  'mb',
  'ml',
  'mr',
  'pt',
  'pb',
  'pl',
  'pr',
]

const getSpacingValue = (key: TSpacingKey, element: HTMLElement) => {
  const elementClass = element.getAttribute('class')

  if (elementClass) {
    const keyClass = elementClass.split(' ').find((v) => v.startsWith(key))

    if (keyClass) {
      return keyClass.split('-')[1]
    }
  }

  return DEFAULT_SPACING
}

const Spacing = Extension.create({
  addGlobalAttributes() {
    const spacingAttrsObj = spacingAttrs.reduce((acc, key) => {
      return {
        ...acc,
        [key]: {
          default: DEFAULT_SPACING,
          parseHTML: (element: HTMLElement) => getSpacingValue(key, element),
          renderHTML: () => {},
        },
      }
    }, {}) as Record<TSpacingKey, { default: string }>

    return [
      {
        types: ['heading', 'paragraph', 'divBlock'],
        attributes: {
          ...spacingAttrsObj,
          class: {
            renderHTML: (attributes: Record<string, string>) => {
              const spacingClass = spacingAttrs
                .filter((key) => attributes[key] !== '0')
                .map((key) => spacing[key][attributes[key]])
                .filter(Boolean)

              return {
                class: cn(attributes.class, ...spacingClass),
              }
            },
          },
        },
      },
    ]
  },
})

export default Spacing
