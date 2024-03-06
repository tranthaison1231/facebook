import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { Button } from './button'
import { Calendar } from './calendar'
import { DateInput } from './date-input'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from './select'
import dayjs from 'dayjs'

export interface DateRangePickerProps {
  onUpdate?: (values: { range: DateRange, rangeCompare?: DateRange }) => void
  initialDateFrom?: Date | string
  initialDateTo?: Date | string
  initialCompareFrom?: Date | string
  initialCompareTo?: Date | string
  align?: 'start' | 'center' | 'end'
  locale?: string
  showCompare?: boolean
}

const formatDate = (date: Date, locale: string = 'en-us'): string => {
  return date.toLocaleDateString(locale, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}

interface DateRange {
  from: Date
  to: Date | undefined
}

interface Preset {
  name: string
  label: string
}

// Define presets
const PRESETS: Preset[] = [
  { name: 'today', label: 'Today' },
  { name: 'yesterday', label: 'Yesterday' },
  { name: 'last7', label: 'Last 7 days' },
  { name: 'last14', label: 'Last 14 days' },
  { name: 'last30', label: 'Last 30 days' },
  { name: 'thisWeek', label: 'This Week' },
  { name: 'lastWeek', label: 'Last Week' },
  { name: 'thisMonth', label: 'This Month' },
  { name: 'lastMonth', label: 'Last Month' }
]

export const DateRangePicker = ({
  initialDateFrom = new Date(new Date().setHours(0, 0, 0, 0)),
  initialDateTo,
  initialCompareFrom,
  initialCompareTo,
  onUpdate,
  align = 'end',
  locale = 'en-US',
}: DateRangePickerProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false)

  const [range, setRange] = useState<DateRange>({
    from: new Date(new Date(initialDateFrom).setHours(0, 0, 0, 0)),
    to: initialDateTo
      ? new Date(new Date(initialDateTo).setHours(0, 0, 0, 0))
      : new Date(new Date(initialDateFrom).setHours(0, 0, 0, 0))
  })
  const [rangeCompare, setRangeCompare] = useState<DateRange | undefined>(
    initialCompareFrom
      ? {
          from: new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0)),
          to: initialCompareTo
            ? new Date(new Date(initialCompareTo).setHours(0, 0, 0, 0))
            : new Date(new Date(initialCompareFrom).setHours(0, 0, 0, 0))
        }
      : undefined
  )

  // Refs to store the values of range and rangeCompare when the date picker is opened
  const openedRangeRef = useRef<DateRange | undefined>()
  const openedRangeCompareRef = useRef<DateRange | undefined>()

  const [selectedPreset, setSelectedPreset] = useState<string | undefined>(undefined)

  const [isSmallScreen, setIsSmallScreen] = useState(typeof window !== 'undefined' ? window.innerWidth < 960 : false)

  useEffect(() => {
    const handleResize = (): void => {
      setIsSmallScreen(window.innerWidth < 960)
    }

    window.addEventListener('resize', handleResize)

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const getPresetRange = (presetName: string): DateRange => {
    const preset = PRESETS.find(({ name }) => name === presetName)
    if (!preset) throw new Error(`Unknown date range preset: ${presetName}`)
    const from = new Date()
    const to = new Date()
    const first = from.getDate() - from.getDay()

    switch (preset.name) {
      case 'today':
        from.setHours(0, 0, 0, 0)
        to.setHours(23, 59, 59, 999)
        break
      case 'yesterday':
        from.setDate(from.getDate() - 1)
        from.setHours(0, 0, 0, 0)
        to.setDate(to.getDate() - 1)
        to.setHours(23, 59, 59, 999)
        break
      case 'last7':
        from.setDate(from.getDate() - 6)
        from.setHours(0, 0, 0, 0)
        to.setHours(23, 59, 59, 999)
        break
      case 'last14':
        from.setDate(from.getDate() - 13)
        from.setHours(0, 0, 0, 0)
        to.setHours(23, 59, 59, 999)
        break
      case 'last30':
        from.setDate(from.getDate() - 29)
        from.setHours(0, 0, 0, 0)
        to.setHours(23, 59, 59, 999)
        break
      case 'thisWeek':
        from.setDate(first)
        from.setHours(0, 0, 0, 0)
        to.setHours(23, 59, 59, 999)
        break
      case 'lastWeek':
        from.setDate(from.getDate() - 7 - from.getDay())
        to.setDate(to.getDate() - to.getDay() - 1)
        from.setHours(0, 0, 0, 0)
        to.setHours(23, 59, 59, 999)
        break
      case 'thisMonth':
        from.setDate(1)
        from.setHours(0, 0, 0, 0)
        to.setHours(23, 59, 59, 999)
        break
      case 'lastMonth':
        from.setMonth(from.getMonth() - 1)
        from.setDate(1)
        from.setHours(0, 0, 0, 0)
        to.setDate(0)
        to.setHours(23, 59, 59, 999)
        break
    }

    return { from, to }
  }

  const setPreset = (preset: string): void => {
    const range = getPresetRange(preset)
    setRange(range)
    if (rangeCompare) {
      const rangeCompare = {
        from: new Date(range.from.getFullYear() - 1, range.from.getMonth(), range.from.getDate()),
        to: range.to ? new Date(range.to.getFullYear() - 1, range.to.getMonth(), range.to.getDate()) : undefined
      }
      setRangeCompare(rangeCompare)
    }
  }

  const checkPreset = (): void => {
    for (const preset of PRESETS) {
      const presetRange = getPresetRange(preset.name)

      const normalizedRangeFrom = new Date(range.from.setHours(0, 0, 0, 0))
      const normalizedPresetFrom = new Date(presetRange.from.setHours(0, 0, 0, 0))

      const normalizedRangeTo = new Date(range.to?.setHours(0, 0, 0, 0) ?? 0)
      const normalizedPresetTo = new Date(presetRange.to?.setHours(0, 0, 0, 0) ?? 0)

      if (
        normalizedRangeFrom.getTime() === normalizedPresetFrom.getTime() &&
        normalizedRangeTo.getTime() === normalizedPresetTo.getTime()
      ) {
        setSelectedPreset(preset.name)
        return
      }
    }

    setSelectedPreset(undefined)
  }

  const resetValues = (): void => {
    setRange({
      from: typeof initialDateFrom === 'string' ? new Date(initialDateFrom) : initialDateFrom,
      to: initialDateTo
        ? typeof initialDateTo === 'string'
          ? new Date(initialDateTo)
          : initialDateTo
        : typeof initialDateFrom === 'string'
          ? new Date(initialDateFrom)
          : initialDateFrom
    })
    setRangeCompare(
      initialCompareFrom
        ? {
            from: typeof initialCompareFrom === 'string' ? new Date(initialCompareFrom) : initialCompareFrom,
            to: initialCompareTo
              ? typeof initialCompareTo === 'string'
                ? new Date(initialCompareTo)
                : initialCompareTo
              : typeof initialCompareFrom === 'string'
                ? new Date(initialCompareFrom)
                : initialCompareFrom
          }
        : undefined
    )
  }

  useEffect(() => {
    checkPreset()
  }, [range])

  const areRangesEqual = (a?: DateRange, b?: DateRange) => {
    if (!a || !b) return a === b
    return a.from.getTime() === b.from.getTime() && (!a.to || !b.to || a.to.getTime() === b.to.getTime())
  }

  useEffect(() => {
    if (isOpen) {
      openedRangeRef.current = range
      openedRangeCompareRef.current = rangeCompare
    }
  }, [isOpen])

  return (
    <Popover
      modal={true}
      open={isOpen}
      onOpenChange={(open: boolean) => {
        if (!open) {
          resetValues()
        }
        setIsOpen(open)
      }}
    >
      <PopoverTrigger asChild>
        <Button size={'lg'} variant="outline" className="w-full">
          <div className="text-right">
            <div className="py-1">
              <div>{`${formatDate(range.from, locale)}${
                range.to != null ? ' - ' + formatDate(range.to, locale) : ''
              }`}</div>
            </div>
            {rangeCompare != null && (
              <div className="-mt-1 text-xs opacity-60">
                <>
                  vs. {formatDate(rangeCompare.from, locale)}
                  {rangeCompare.to != null ? ` - ${formatDate(rangeCompare.to, locale)}` : ''}
                </>
              </div>
            )}
          </div>
          <div className="-mr-2 scale-125 pl-1 opacity-60">
            {isOpen ? <ChevronUpIcon width={24} /> : <ChevronDownIcon width={24} />}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent align={align} className="w-auto">
        <div className="flex py-2">
          <div className="flex">
            <div className="flex flex-col">
              <div className="flex flex-col items-center justify-end gap-2 px-3 pb-4 lg:flex-row lg:items-start lg:pb-0">
                <div className="flex flex-col items-center space-x-2 py-1 pr-4">
                  <h1 className="text-xl font-bold">{ range.from && range.to ? `${dayjs(range.to).diff(dayjs(range.from), 'days')} nights` : 'Select Date'}</h1>
                  {dayjs(range.from).format('MMM DD, YYYY')} - {dayjs(range.to).format('MMM DD, YYYY')}
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex gap-2">
                    <DateInput
                      value={range.from}
                      onChange={date => {
                        const toDate = range.to == null || date > range.to ? date : range.to
                        setRange(prevRange => ({
                          ...prevRange,
                          from: date,
                          to: toDate
                        }))
                      }}
                    />
                    <div className="py-1">-</div>
                    <DateInput
                      value={range.to}
                      onChange={date => {
                        const fromDate = date < range.from ? date : range.from
                        setRange(prevRange => ({
                          ...prevRange,
                          from: fromDate,
                          to: date
                        }))
                      }}
                    />
                  </div>
                  {rangeCompare != null && (
                    <div className="flex gap-2">
                      <DateInput
                        value={rangeCompare?.from}
                        onChange={date => {
                          if (rangeCompare) {
                            const compareToDate =
                              rangeCompare.to == null || date > rangeCompare.to ? date : rangeCompare.to
                            setRangeCompare(prevRangeCompare => ({
                              ...prevRangeCompare,
                              from: date,
                              to: compareToDate
                            }))
                          } else {
                            setRangeCompare({
                              from: date,
                              to: new Date()
                            })
                          }
                        }}
                      />
                      <div className="py-1">-</div>
                      <DateInput
                        value={rangeCompare?.to}
                        onChange={date => {
                          if (rangeCompare && rangeCompare.from) {
                            const compareFromDate = date < rangeCompare.from ? date : rangeCompare.from
                            setRangeCompare({
                              ...rangeCompare,
                              from: compareFromDate,
                              to: date
                            })
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              {isSmallScreen && (
                <Select
                  defaultValue={selectedPreset}
                  onValueChange={value => {
                    setPreset(value)
                  }}
                >
                  <SelectTrigger className="mx-auto mb-2 w-[180px]">
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {PRESETS.map(preset => (
                      <SelectItem key={preset.name} value={preset.name}>
                        {preset.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              <div>
                <Calendar
                  mode="range"
                  onSelect={(value: { from?: Date; to?: Date } | undefined) => {
                    if (value?.from != null) {
                      setRange({ from: value.from, to: value?.to })
                    }
                  }}
                  selected={range}
                  numberOfMonths={isSmallScreen ? 1 : 2}
                  defaultMonth={new Date(new Date().setMonth(new Date().getMonth() - (isSmallScreen ? 0 : 1)))}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 py-2 pr-4">
          <Button
            onClick={() => {
              setIsOpen(false)
              resetValues()
            }}
            variant="ghost"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsOpen(false)
              if (
                !areRangesEqual(range, openedRangeRef.current) ||
                !areRangesEqual(rangeCompare, openedRangeCompareRef.current)
              ) {
                onUpdate?.({ range, rangeCompare })
              }
            }}
          >
            Update
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
