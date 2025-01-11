'use client'
import dynamic from 'next/dynamic'

const Canvas = dynamic(() => import('./components/Canvas'), {
  ssr: false,
})

import { MainNav } from './components/MainNav'
import { StylePanel } from './components/StylePanel'

const Editor = () => {
  return (
    <div className="flex flex-1">
      <aside className="w-64 border-r">
        <MainNav />
      </aside>
      <main className="flex-1 p-4">
        <div className="h-full rounded-lg border bg-white">
          <Canvas />
        </div>
      </main>
      <aside className="border-l">
        <StylePanel />
      </aside>
    </div>
  )
}

export default Editor
