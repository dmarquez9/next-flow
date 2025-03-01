'use client'
import { JSONContent } from '@tiptap/react'
import { DynamicIcon } from 'lucide-react/dynamic'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { capitalizeFirstLetter } from '@/lib/utils'

import { useEditor } from '../context/useEditor'
import { getIconName } from '../utils'

export default function LayerList() {
  const { currentContent } = useEditor()
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Layers</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {currentContent?.content?.map(
            (content: JSONContent, index: number) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton>
                  <DynamicIcon name={getIconName(content)} />
                  <span>
                    {capitalizeFirstLetter(content?.type || 'paragraph')}
                  </span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
