'use client'

import * as React from 'react'

import { DynamicIcon } from 'lucide-react/dynamic'

import { useCurrentNode } from '../context/useCurrentNode'
import { getIconName } from '../utils'

export default function LayerHeader() {
  const { type } = useCurrentNode()

  if (!type) return null
  return (
    <div className="p-2 flex items-center gap-2 text-sm">
      <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <DynamicIcon className="size-4" name={getIconName({ type })} />
      </div>
      <div className="flex flex-col gap-0.5 leading-none">
        <span className="font-semibold">Layer Style</span>
        <span className="">{type}</span>
      </div>
    </div>
  )
}
