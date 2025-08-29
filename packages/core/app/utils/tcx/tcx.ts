import { extendTailwindMerge } from "tailwind-merge"
import { tv } from "tailwind-variants"

// Define custom config for tailwind-merge (only define once)
const customTwMergeConfig = {
  extend: {
    classGroups: {
      // Ensure custom typography tokens are treated as font-size, not text color
      "font-size": [
        {
          text: [
            "body-large",
            "body-large-strong",
            "body-medium",
            "body-medium-strong",
            "body-small",
            "body-small-strong",
            "heading-display",
            "heading-large",
            "heading-medium",
            "heading-small",
          ],
        },
      ],
    },
  },
}

// Create a single extended twMerge instance (only created once!)
// This is the key performance optimization - extendTailwindMerge should only be called once
const twm = extendTailwindMerge(customTwMergeConfig)

// Use the pre-configured twm instance
export const tcx = twm

// Create TV with the same configuration to ensure consistency
// Pass the config object, not the function, to avoid double processing
export const tcv = tv

// Re-export types
export type { TV, TVReturnType, VariantProps } from "tailwind-variants"
