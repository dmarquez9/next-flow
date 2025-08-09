'use client'

import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from 'lucide-react'

import { headingClassByLevel } from '@/components/extensions/Heading'
import { SidebarGroup, SidebarGroupContent } from '@/components/ui/sidebar'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

import { useCurrentNode } from '../../context/useCurrentNode'
import { useEditorPage } from '../../context/useEditorPage'

export default function HeadingGroup() {
  const { changeNodeType, editor } = useEditorPage()
  const { type } = useCurrentNode()

  if (type !== 'heading') {
    return null
  }

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <ToggleGroup
          type="single"
          size="sm"
          value={String(editor.getAttributes('heading').level)}
          onValueChange={(value) =>
            changeNodeType('heading', {
              level: Number(value),
              class: headingClassByLevel[value],
            })
          }
          className="bg-white dark:bg-black rounded-lg shadow-sm p-1 justify-between"
        >
          <ToggleGroupItem value="1" aria-label="Heading Level 1">
            <Heading1 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="2" aria-label="Heading Level 2">
            <Heading2 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="3" aria-label="Heading Level 3">
            <Heading3 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="4" aria-label="Heading Level 4">
            <Heading4 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="5" aria-label="Heading Level 5">
            <Heading5 className="h-4 w-4" />
          </ToggleGroupItem>
          <ToggleGroupItem value="6" aria-label="Heading Level 6">
            <Heading6 className="h-4 w-4" />
          </ToggleGroupItem>
        </ToggleGroup>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
