'use client'

import { memo } from 'react'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { twSpacing } from '@/lib/constants'
import { TSpacingKey } from '@/types'

import { useCurrentNode } from '../context/useCurrentNode'
import { useEditorPage } from '../context/useEditorPage'
import { emitNodeAttrsUpdated } from '../events/nodeAttrsUpdated'

function SelectSpacing({ spacingKey }: { spacingKey: TSpacingKey }) {
  const { updateNodeAttr } = useEditorPage()
  const { attributes } = useCurrentNode()

  const handleValueChange = (value: string) => {
    updateNodeAttr({ [spacingKey]: value })
    emitNodeAttrsUpdated({ category: 'spacing', keys: [spacingKey] })
  }

  const currentValue = attributes[spacingKey] as string

  if (!currentValue) {
    return null
  }

  return (
    <Select value={currentValue} onValueChange={handleValueChange}>
      <SelectTrigger className="border-0 focus:outline-none focus:ring-0 focus:border-0 p-0 h-auto [&>svg]:hidden">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {twSpacing.map((key) => (
          <SelectItem key={`select-${spacingKey}-${key}`} value={key}>
            {key}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

export default memo(SelectSpacing)
