import * as React from 'react'

import { Sidebar, SidebarContent, SidebarHeader } from '@/components/ui/sidebar'

import { LayerSwitcher } from './LayerSwitcher'
import TypographyGroup from './style-group/TypographyGroup'

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
        <LayerSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <TypographyGroup />
      </SidebarContent>
    </Sidebar>
  )
}
