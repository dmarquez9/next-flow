'use client'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { useEditorPage } from '../context/useEditorPage'
import { usePage } from '../context/usePage'

export function SavePageButton() {
  const { editor } = useEditorPage()
  const { isSaving, savePageContent } = usePage()

  return (
    <Button
      onClick={() => savePageContent(editor.getJSON())}
      disabled={isSaving}
    >
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
