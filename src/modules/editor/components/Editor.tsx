'use client'
import dynamic from 'next/dynamic'

import CanvasLoading from './CanvasLoading'
import EditorHeader from './EditorHeader'

const Canvas = dynamic(() => import('./Canvas'), {
  ssr: false,
  loading: () => <CanvasLoading />,
})

const Editor = () => {
  return (
    <>
      <EditorHeader />
      <Canvas />
    </>
  )
}

export default Editor
