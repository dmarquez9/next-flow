import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { getAllPageSlugs } from '@/lib/db/page'
import { capitalizeFirstLetter } from '@/lib/utils'

export async function SelectPage() {
  const pagesSlugs = await getAllPageSlugs()
  const activePage = pagesSlugs[0]?.slug || 'home'

  return (
    <Select defaultValue={activePage}>
      <SelectTrigger className="w-[120px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {pagesSlugs.map((page) => (
          <SelectItem key={page.slug} value={page.slug}>
            {capitalizeFirstLetter(page.slug)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
