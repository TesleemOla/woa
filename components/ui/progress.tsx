"use client"

import type * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

function Progress({
  className,
  value,
  style,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root> & {
  style?: React.CSSProperties
}) {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={cn("bg-primary/20 relative h-2 w-full overflow-hidden rounded-full", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className="h-full w-full flex-1 transition-all duration-1000 ease-out rounded-full"
        style={{
          transform: `translateX(-${100 - (value || 0)}%)`,
          backgroundColor: style?.["--progress-background" as keyof React.CSSProperties] || "var(--color-primary)",
          ...style,
        }}
      />
    </ProgressPrimitive.Root>
  )
}

export { Progress }
