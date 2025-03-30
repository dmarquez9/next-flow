'use client'

import * as React from 'react'

import {
  Check,
  ChevronsUpDown,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
} from 'lucide-react'
import { DynamicIcon } from 'lucide-react/dynamic'

import { headingClassByLevel } from '@/components/extensions/Heading'
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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { capitalizeFirstLetter } from '@/lib/utils'

import { useEditorPage } from '../context/useEditorPage'
import { getIconName } from '../utils'

enum LayerTypes {
  heading = 'heading',
  paragraph = 'paragraph',
}

export function LayerSwitcher() {
  const { changeNodeType, editor } = useEditorPage()
  const currentNode = editor.state.selection.$anchor.parent.type.name
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
                <DynamicIcon
                  className="size-4"
                  name={getIconName({ type: currentNode })}
                />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Layer Style</span>
                <span className="">{currentNode}</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width]"
            align="start"
          >
            {Object.keys(LayerTypes).map((layerType) => (
              <DropdownMenuItem
                key={layerType}
                onSelect={() => changeNodeType(layerType)}
              >
                {capitalizeFirstLetter(layerType)}{' '}
                {layerType === currentNode && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
      {currentNode === 'heading' && (
        <SidebarMenuItem>
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
        </SidebarMenuItem>
      )}
    </SidebarMenu>
  )
}
