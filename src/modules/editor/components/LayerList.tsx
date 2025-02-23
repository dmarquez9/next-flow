'use client'
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
import { Block } from '../types'
import { getIconName } from '../utils'

export default function LayerList() {
  const { currentContent } = useEditor()
  const layers = currentContent as Block[]
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Layers</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {layers.map((content: Block, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton>
                <DynamicIcon name={getIconName(content)} />
                <span>{capitalizeFirstLetter(content.type)}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
