'use client'
import { ChevronDown } from 'lucide-react'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from '@/components/ui/sidebar'

import SelectSpacing from '../SelectSpacing'

export default function SpacingGroup() {
  return (
    <Collapsible defaultOpen className="group/collapsible">
      <SidebarGroup>
        <SidebarGroupLabel asChild>
          <CollapsibleTrigger>
            <span className="text-base">Spacing</span>
            <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
          </CollapsibleTrigger>
        </SidebarGroupLabel>
        <CollapsibleContent className="py-4 px-2">
          <SidebarGroupContent>
            <div className="relative border border-dashed border-gray-600 w-full h-48 flex items-center justify-center rounded p-4">
              <span className="text-[10px] text-muted-foreground absolute right-1 bottom-1">
                margin
              </span>
              <div className="absolute top-2">
                <SelectSpacing spacingKey="mt" />
              </div>
              <div className="absolute bottom-2">
                <SelectSpacing spacingKey="mb" />
              </div>
              <div className="absolute left-2">
                <SelectSpacing spacingKey="ml" />
              </div>
              <div className="absolute right-2">
                <SelectSpacing spacingKey="mr" />
              </div>

              {/* Inner padding box */}
              <div className="relative border border-gray-500 w-3/4 h-28 flex items-center justify-center rounded">
                <span className="text-[10px] text-muted-foreground absolute right-1 bottom-1">
                  padding
                </span>
                <div className="absolute top-2">
                  <SelectSpacing spacingKey="pt" />
                </div>
                <div className="absolute bottom-2">
                  <SelectSpacing spacingKey="pb" />
                </div>
                <div className="absolute left-2">
                  <SelectSpacing spacingKey="pl" />
                </div>
                <div className="absolute right-2">
                  <SelectSpacing spacingKey="pr" />
                </div>

                {/* Center control */}
                <div className="w-6 h-6 bg-blue-500 rounded"></div>
              </div>
            </div>
          </SidebarGroupContent>
        </CollapsibleContent>
      </SidebarGroup>
    </Collapsible>
  )
}
