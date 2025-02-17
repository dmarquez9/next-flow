import { SelectPage } from './SelectPage'
import { SavePageButton } from './SavePageButton'

export function TopNav() {
  return (
    <header className="flex h-14 items-center justify-between border-b px-4">
      <div className="flex items-center gap-4">
        <SelectPage />
      </div>
      <div className="flex items-center gap-2">
        <SavePageButton />
      </div>
    </header>
  )
}
