'use client'
import { Button } from '@/components/ui/button'
import { useEditor } from '../context/useEditor'

export function SavePageButton() {
  const { savePageContent } = useEditor()

  return <Button onClick={savePageContent}>Save</Button>
}
