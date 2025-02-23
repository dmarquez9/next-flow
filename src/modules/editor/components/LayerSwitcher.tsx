'use client'

import * as React from 'react'

import { Check, ChevronsUpDown } from 'lucide-react'
import { DynamicIcon } from 'lucide-react/dynamic'

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

enum LayerTypes {
  heading = 'heading',
  paragraph = 'paragraph',
}

type LayerTypesKeys = keyof typeof LayerTypes
const defaultLayer: LayerTypesKeys = 'paragraph'
import { getIconName } from '../utils'

export function LayerSwitcher() {
  const [selectedLayer, setSelectedLayer] =
    React.useState<LayerTypesKeys>(defaultLayer)

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
                  name={getIconName({ type: selectedLayer })}
                />
              </div>
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-semibold">Layer Style</span>
                <span className="">{selectedLayer}</span>
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
                onSelect={() => setSelectedLayer(layerType as LayerTypesKeys)}
              >
                {capitalizeFirstLetter(layerType)}{' '}
                {layerType === selectedLayer && <Check className="ml-auto" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
