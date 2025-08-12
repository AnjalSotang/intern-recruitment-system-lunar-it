import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      // Base styles
      "inline-flex items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground",
      // Mobile: horizontal scrolling layout
      "flex-row w-full overflow-x-auto scrollbar-hide",
      // Mobile: maintain height and prevent wrapping
      "h-auto sm:h-9 flex-nowrap sm:flex-wrap",
      // Mobile: no gap needed for horizontal scroll
      "gap-0 p-1",
      // Tablet and up: normal inline flex behavior
      "sm:w-auto sm:overflow-visible",
      className
    )}
    {...props} />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      // Base styles
      "inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow",
      // Mobile: prevent shrinking, compact padding, smaller text
      "flex-shrink-0 px-3 py-2 sm:px-3 sm:py-1 text-xs sm:text-sm",
      // Mobile: minimum width for touch targets
      "min-w-[80px] sm:min-w-0",
      // Mobile: minimum height for better touch interaction
      "min-h-[36px] sm:min-h-0",
      // Keep text nowrap for horizontal scrolling
      "whitespace-nowrap text-center",
      className
    )}
    {...props} />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      // Base styles
      "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      // Responsive spacing
      "mt-4 sm:mt-2",
      // Ensure content doesn't overflow on small screens
      "w-full overflow-hidden",
      className
    )}
    {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }