import { ChevronDown, Layers, Home } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/lib/utils'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'

interface NavItemProps {
  label: string
  children?: React.ReactNode
  className?: string
  icon?: React.ReactNode
  expanded?: boolean
}

function NavItem({
  label,
  children,
  className,
  icon,
  expanded = false,
}: NavItemProps) {
  if (children) {
    return (
      <Collapsible defaultOpen={expanded}>
        <CollapsibleTrigger className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground">
          {icon}
          <span className="flex-1 text-left">{label}</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4">{children}</CollapsibleContent>
      </Collapsible>
    )
  }

  return (
    <Link
      href="#"
      className={cn(
        'flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground',
        className
      )}
    >
      {icon}
      <span>{label}</span>
    </Link>
  )
}

export function MainNav() {
  return (
    <div className="flex flex-col gap-4">
      <NavItem label="Homepage" icon={<Home className="h-4 w-4" />} />
      <NavItem label="Layers" icon={<Layers className="h-4 w-4" />} expanded>
        <NavItem label="Body">
          <NavItem label="Navigation" />
          <NavItem label="Hero">
            <NavItem label="Container">
              <NavItem label="Layout">
                <NavItem label="Heading">
                  <NavItem
                    label="H1 Heading 1"
                    className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                  />
                  <NavItem label="Paragraph" />
                  <NavItem label="Buttons" />
                  <NavItem label="Video" />
                </NavItem>
              </NavItem>
            </NavItem>
          </NavItem>
        </NavItem>
      </NavItem>
    </div>
  )
}
