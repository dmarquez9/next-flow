'use client'

import { useEffect, useState } from 'react'

import { Progress } from '@/components/ui/progress'

const CanvasLoading = () => {
  const [progress, setProgress] = useState(10)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 10)
        return next >= 90 ? 90 : next
      })
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <Progress value={progress} className="w-1/2" />
    </div>
  )
}

export default CanvasLoading
