'use client'
import dynamic from 'next/dynamic'

const Canvas = dynamic(() => import('./Canvas'), {
  ssr: false,
})

import EditorHeader from './EditorHeader'

const Editor = () => {
  return (
    <>
      <EditorHeader />
      <Canvas />
    </>
  )
}

export default Editor
