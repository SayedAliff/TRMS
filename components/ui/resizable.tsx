"use client"

import * as React from "react"


import { GripVertical } from "lucide-react"

import { cn } from "./utils"

interface ResizablePanelGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: "horizontal" | "vertical"
}

const ResizablePanelGroup = React.forwardRef<HTMLDivElement, ResizablePanelGroupProps>(
  ({ className, direction = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full",
        direction === "vertical" && "flex-col",
        className
      )}
      {...props}
    />
  )
)
ResizablePanelGroup.displayName = "ResizablePanelGroup"

interface ResizablePanelProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultSize?: number
  minSize?:  number
  maxSize?: number
}

const ResizablePanel = React.forwardRef<HTMLDivElement, ResizablePanelProps>(
  ({ className, ... props }, ref) => (
    <div
      ref={ref}
      className={cn("flex-1", className)}
      {...props}
    />
  )
)
ResizablePanel.displayName = "ResizablePanel"

interface ResizableHandleProps extends React.HTMLAttributes<HTMLDivElement> {
  withHandle?: boolean
}

const ResizableHandle = React.forwardRef<HTMLDivElement, ResizableHandleProps>(
  ({ withHandle, className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex w-px items-center justify-center bg-border after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1",
        className
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <GripVertical className="h-2.5 w-2.5" />
        </div>
      )}
    </div>
  )
)
ResizableHandle.displayName = "ResizableHandle"

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }