'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { capitalizeFirstLetter } from '@/lib/utils'

import { useEditor } from '../context/useEditor'

export function SelectPage() {
  const { currentPage, pages, setPage } = useEditor()

  const handlePageChange = (slug: string) => {
    setPage(slug)
  }

  return (
    <Select value={currentPage} onValueChange={handlePageChange}>
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {pages.map((slug) => (
          <SelectItem key={slug} value={slug}>
            {capitalizeFirstLetter(slug)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
