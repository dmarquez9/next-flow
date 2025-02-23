import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function capitalizeFirstLetter(text: string): string {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function getInitials(name: string): string {
  const words = name.trim().split(' ')
  const firstInitial = words[0]?.charAt(0).toUpperCase() || ''
  const secondInitial = words[1]?.charAt(0).toUpperCase() || ''

  return firstInitial + secondInitial
}
