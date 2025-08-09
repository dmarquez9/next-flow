'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'

import { useCurrentNode } from '../context/useCurrentNode'

import LayerList from './LayerList'
import { NavUser } from './NavUser'
import { SelectPage } from './SelectPage'

export default function EditorSidebar() {
  const { node } = useCurrentNode()
  return (
    <Sidebar key={node?.toString()}>
      <SidebarHeader>
        <SelectPage />
      </SidebarHeader>
      <SidebarContent>
        <LayerList />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
