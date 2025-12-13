import { Check } from "@choiceform/icons-react"
import { Menus } from "@choice-ui/menus"
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useEventCallback } from "usehooks-ts"
import { useMergedValue } from "@choice-ui/shared"
import type { BaseTimeProps, StepProps } from "../types"
import { generateTimeOptions, normalizeTimeValue, timeStringToDate } from "../utils"

export interface TimeCalendarProps extends BaseTimeProps, StepProps {
  children?: React.ReactNode
  /** Custom class name */
  className?: string
  /** Hour step, default 1 hour */
  hourStep?: number
  /** Minute step, default 15 minutes */
  minuteStep?: number
}

export const TimeCalendar = memo(function TimeCalendar(props: TimeCalendarProps) {
  const {
    value,
    defaultValue,
    onChange,
    format: timeFormat = "HH:mm",
    step = 15,
    className,
    children,
    readOnly = false,
    ...rest
  } = props

  // References
  const scrollRef = useRef<HTMLDivElement>(null)
  const elementsRef = useRef<Array<HTMLButtonElement | null>>([])
  const customElementRef = useRef<HTMLButtonElement | null>(null) // Custom time item independent ref
  const hasInitialScrolled = useRef(false)
  const lastSelectedIndexRef = useRef<number | null>(null)
  const isInternalOperationRef = useRef(false)

  // Local state management
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)

  // Use useMergedValue to manage controlled/uncontrolled state
  const [innerValue, setValue] = useMergedValue({
    value,
    defaultValue,
    onChange: onChange,
    allowEmpty: true,
  })

  // Generate time options - keep completely stable
  const timeOptions = useMemo(() => {
    return generateTimeOptions(timeFormat, step)
  }, [timeFormat, step])

  const normalizedTimeString = useMemo(() => {
    return normalizeTimeValue(innerValue)
  }, [innerValue])

  const formatTo12Hour = useCallback((timeStr: string): string => {
    const [hour, minute] = timeStr.split(":").map(Number)
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour
    const ampm = hour < 12 ? "AM" : "PM"
    return `${displayHour}:${minute.toString().padStart(2, "0")} ${ampm}`
  }, [])

  const customTimeOption = useMemo(() => {
    if (!normalizedTimeString) return null

    // Check if it is in the standard options
    const hasStandardOption = timeOptions.some((option) => option.value === normalizedTimeString)
    if (hasStandardOption) return null

    // Generate custom options
    const is12Hour = timeFormat.toLowerCase().includes("a") || timeFormat === "12h"
    return {
      value: normalizedTimeString,
      label: is12Hour ? formatTo12Hour(normalizedTimeString) : normalizedTimeString,
    }
  }, [normalizedTimeString, timeOptions, timeFormat, formatTo12Hour]) // Add formatTo12Hour to the dependency array

  const renderTimeLabel = useCallback(
    (label: string) => {
      // Check if it is 12 hour format - check if the format string contains 12 hour identifier
      const is12Hour = timeFormat.toLowerCase().includes("a") || timeFormat === "12h"
      if (is12Hour && label.includes(" ")) {
        const [timePart, ampmPart] = label.split(" ")
        return (
          <>
            <span>{timePart}</span>
            <span className="flex-1 text-right text-white/40">{ampmPart}</span>
          </>
        )
      }
      return label
    },
    [timeFormat],
  )

  const selectedIndex = useMemo(() => {
    if (!normalizedTimeString) return null

    // Find in the standard options
    const index = timeOptions.findIndex((option) => option.value === normalizedTimeString)

    // If found, return the index; if not found, it means it is a custom time, return -1
    return index === -1 ? -1 : index
  }, [normalizedTimeString, timeOptions])

  // Check if we need divider between AM and PM
  const needsDivider = useMemo(() => {
    // Check if it is 12 hour format - check if the format string contains 12 hour identifier
    const is12Hour = timeFormat.toLowerCase().includes("a") || timeFormat === "12h"
    if (!is12Hour) return () => false

    return (index: number) => {
      return (
        index > 0 &&
        timeOptions[index].label.includes("PM") &&
        timeOptions[index - 1].label.includes("AM")
      )
    }
  }, [timeFormat, timeOptions])

  // Create prefix element like DropdownItem does
  const createPrefixElement = useCallback((isSelected: boolean) => {
    return isSelected ? <Check /> : <></>
  }, [])

  // Scroll event handling: hide active when scrolling, restore immediately after stopping
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mousePositionRef = useRef<{ x: number; y: number } | null>(null)

  const handleScroll = useEventCallback(() => {
    // Immediately hide active state when scrolling
    if (!isScrolling) {
      setIsScrolling(true)
      setActiveIndex(null)
    }

    // Clear the previous timer
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Immediately restore active state display after scrolling stops
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false)

      // Use the recorded mouse position to detect the element that should be activated
      if (mousePositionRef.current) {
        const elementUnderMouse = document.elementFromPoint(
          mousePositionRef.current.x,
          mousePositionRef.current.y,
        )

        // First check the custom time item
        if (
          customElementRef.current &&
          (customElementRef.current === elementUnderMouse ||
            customElementRef.current.contains(elementUnderMouse))
        ) {
          setActiveIndex(-1)
          return
        }

        // Check the standard time item
        const elements = elementsRef.current
        for (let i = 0; i < elements.length; i++) {
          if (
            elements[i] &&
            (elements[i] === elementUnderMouse || elements[i]?.contains(elementUnderMouse))
          ) {
            setActiveIndex(i)
            break
          }
        }
      }
    }, 200)
  })

  // Record the mouse position
  const handleMouseMove = useEventCallback((event: React.MouseEvent) => {
    mousePositionRef.current = { x: event.clientX, y: event.clientY }
  })

  // Clear the timer
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Smart scrolling logic: support initial scrolling and external value change scrolling
  useEffect(() => {
    // Handle custom time items (selectedIndex = -1)
    if (selectedIndex === -1) {
      const customElement = customElementRef.current
      if (!customElement || !scrollRef.current) {
        return
      }

      const previousSelectedIndex = lastSelectedIndexRef.current
      const isSelectedIndexChanged = previousSelectedIndex !== selectedIndex

      // Record the current selected index
      lastSelectedIndexRef.current = selectedIndex

      // Check if it is necessary to scroll
      const shouldScroll =
        !hasInitialScrolled.current || // Initial scrolling
        (isSelectedIndexChanged && !isInternalOperationRef.current) // External value change scrolling

      if (shouldScroll) {
        const isInitialScroll = !hasInitialScrolled.current

        if (isInitialScroll) {
          // Custom items are always at the top, scroll to the top
          scrollRef.current.scrollTo({
            top: 0,
            behavior: "auto",
          })
        } else {
          // Ensure the custom item is visible
          customElement.scrollIntoView({
            block: "nearest",
            behavior: "smooth",
          })
        }

        // Marked as completed initial scrolling
        if (!hasInitialScrolled.current) {
          hasInitialScrolled.current = true
        }
      }

      // Reset the internal operation marker
      if (isInternalOperationRef.current) {
        isInternalOperationRef.current = false
      }
      return
    }

    // Handle standard time items
    if (selectedIndex === null || !scrollRef.current || !elementsRef.current[selectedIndex]) {
      return
    }

    const previousSelectedIndex = lastSelectedIndexRef.current
    const isSelectedIndexChanged = previousSelectedIndex !== selectedIndex

    // Record the current selected index
    lastSelectedIndexRef.current = selectedIndex

    // Check if it is necessary to scroll
    const shouldScroll =
      !hasInitialScrolled.current || // Initial scrolling
      (isSelectedIndexChanged && !isInternalOperationRef.current) // External value change scrolling

    if (shouldScroll) {
      // Initial scrolling: position in the middle, no animation
      // Controlled/keyboard navigation scrolling: natural positioning (nearest), smooth animation
      const isInitialScroll = !hasInitialScrolled.current

      if (isInitialScroll) {
        // Initial scrolling: center alignment
        elementsRef.current[selectedIndex]?.scrollIntoView({
          block: "center",
          behavior: "auto",
        })
      } else {
        // Controlled/keyboard navigation scrolling: intelligent positioning with 8px margin
        const container = scrollRef.current
        const element = elementsRef.current[selectedIndex]

        if (container && element) {
          const containerRect = container.getBoundingClientRect()
          const elementRect = element.getBoundingClientRect()
          const margin = 8 // 8px margin

          // Calculate the position of the element relative to the container
          const elementTop = elementRect.top - containerRect.top + container.scrollTop
          const elementBottom = elementTop + elementRect.height

          // Container visible area (considering margin)
          const visibleTop = container.scrollTop + margin
          const visibleBottom = container.scrollTop + container.clientHeight - margin

          let targetScrollTop = container.scrollTop

          // If the element is above the visible area, scroll down
          if (elementTop < visibleTop) {
            targetScrollTop = elementTop - margin
          }
          // If the element is below the visible area, scroll up
          else if (elementBottom > visibleBottom) {
            targetScrollTop = elementBottom - container.clientHeight + margin
          }

          // Smooth scroll to the target position
          if (targetScrollTop !== container.scrollTop) {
            container.scrollTo({
              top: targetScrollTop,
            })
          }
        }
      }

      // Marked as completed initial scrolling
      if (!hasInitialScrolled.current) {
        hasInitialScrolled.current = true
      }
    }

    // Reset the internal operation marker
    if (isInternalOperationRef.current) {
      isInternalOperationRef.current = false
    }
  }, [selectedIndex])

  // Handle time selection
  const handleTimeSelect = useEventCallback((timeValue: string) => {
    if (readOnly) return
    // Marked as internal operation, avoid triggering automatic scrolling
    isInternalOperationRef.current = true

    // Convert time string to Date object using public utility
    const dateValue = timeStringToDate(timeValue)
    setValue(dateValue)
  })

  // Handle mouse enter - ignore during scrolling
  const handleMouseEnter = useEventCallback((index: number) => {
    // Do not set active state when scrolling
    if (isScrolling) {
      return
    }
    setActiveIndex(index)
  })

  // Handle mouse leave from container
  const handleMouseLeave = useEventCallback(() => {
    setActiveIndex(null)
  })

  // Handle click selection
  const handleClick = useEventCallback((timeValue: string) => {
    handleTimeSelect(timeValue)
  })

  return (
    <Menus
      ref={scrollRef}
      onScroll={handleScroll}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={className}
      data-testid="time-calendar-menu"
      {...rest}
    >
      {/* Custom time items (if exist) */}
      {customTimeOption && (
        <>
          <Menus.Item
            ref={(node) => {
              customElementRef.current = node
            }}
            selected={selectedIndex === -1}
            active={!isScrolling && activeIndex === -1}
            onClick={() => handleClick(customTimeOption.value)}
            onMouseEnter={() => handleMouseEnter(-1)}
            prefixElement={createPrefixElement(selectedIndex === -1)}
            variant="highlight"
            data-testid="custom-time-item"
          >
            {renderTimeLabel(customTimeOption.label)}
          </Menus.Item>
          <Menus.Divider data-testid="custom-time-divider" />
        </>
      )}

      {/* Standard time list */}
      {timeOptions.map((option, index) => {
        const isAmToPmTransition = needsDivider(index)
        const isItemSelected = selectedIndex === index
        // Do not display active state when scrolling
        const isItemActive = !isScrolling && activeIndex === index

        return (
          <React.Fragment key={option.value}>
            {isAmToPmTransition && <Menus.Divider data-testid="ampm-divider" />}
            <Menus.Item
              ref={(node) => {
                elementsRef.current[index] = node
              }}
              selected={isItemSelected}
              active={isItemActive}
              onClick={() => handleClick(option.value)}
              onMouseEnter={() => handleMouseEnter(index)}
              prefixElement={createPrefixElement(isItemSelected)}
              variant="highlight"
              data-testid={option.value}
            >
              {renderTimeLabel(option.label)}
            </Menus.Item>
          </React.Fragment>
        )
      })}

      {children}
    </Menus>
  )
})

TimeCalendar.displayName = "TimeCalendar"
