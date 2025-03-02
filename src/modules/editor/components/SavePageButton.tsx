'use client'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { usePage } from '../context/usePage'

export function SavePageButton() {
  const { isSaving, savePageContent } = usePage()

  return (
    <Button onClick={savePageContent} disabled={isSaving}>
      {isSaving ? (
        <>
          <Loader2 className="animate-spin" />
          Saving
        </>
      ) : (
        'Save'
      )}
    </Button>
  )
}
