import { Heading } from '@tiptap/extension-heading'

import { cn } from '@/lib/utils'

export const headingClassByLevel: Record<string, string> = {
  1: 'scroll-m-20 text-4xl font-extrabold tracking-tight',
  2: 'scroll-m-20 text-3xl font-semibold tracking-tight',
  3: 'scroll-m-20 text-2xl font-semibold tracking-tight',
  4: 'scroll-m-20 text-xl font-semibold tracking-tight',
}

const CustomHeading = Heading.extend({
  addAttributes() {
    return {
      level: {
        default: 1,
        parseHTML: (element) =>
          parseInt(element.tagName.replace('H', ''), 10) || 1,
        renderHTML: () => ({}),
      },
      class: {
        default: '',
        parseHTML: (element) => element.getAttribute('class') || '',
        renderHTML: (attributes) => ({
          class:
            cn(attributes.class, headingClassByLevel[attributes.level]) || '',
        }),
      },
    }
  },
})

export default CustomHeading
