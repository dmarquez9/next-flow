import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar'

import LayerList from './LayerList'
import { NavUser } from './NavUser'
import { SelectPage } from './SelectPage'

export default function EditorSidebar() {
  return (
    <Sidebar>
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
