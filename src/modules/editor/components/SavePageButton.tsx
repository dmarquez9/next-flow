'use client'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useEditor } from '../context/useEditor'

export function SavePageButton() {
  const { isSaving, savePageContent } = useEditor()

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
