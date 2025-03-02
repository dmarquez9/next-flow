'use client'

import { Check, ChevronsUpDown, StickyNote } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { capitalizeFirstLetter } from '@/lib/utils'

import { usePage } from '../context/usePage'

export function SelectPage() {
  const { currentPage, pages, setPage } = usePage()

  const handlePageChange = (slug: string) => {
    setPage(slug)
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <StickyNote className="size-4" />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">
                  {capitalizeFirstLetter(currentPage)}
                </span>
                <span className="">Current page</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {pages.map((slug) => (
              <DropdownMenuItem
                key={slug}
                onClick={() => handlePageChange(slug)}
              >
                {capitalizeFirstLetter(slug)}{' '}
                {currentPage === slug && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
