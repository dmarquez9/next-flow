import * as React from 'react'

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
} from '@/components/ui/sidebar'

import LayerHeader from './LayerHeader'
import HeadingGroup from './style-group/HeadingGroup'
import SpacingGroup from './style-group/SpacingGroup'

export function StyleSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      collapsible="none"
      className="sticky hidden lg:flex top-0 h-svh border-l"
      {...props}
    >
      <SidebarHeader>
        <LayerHeader />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <HeadingGroup />
          <SpacingGroup />
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}
