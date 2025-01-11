import { useState } from 'react'

const useEditor = () => {
  const [elements, setElements] = useState<string[]>([])

  const addElement = (element: string) => {
    setElements((prev) => [...prev, element])
  }

  return { elements, addElement }
}

export default useEditor
