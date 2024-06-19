import * as React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface InputMonthProps {
  className: string
  value: string
  onChange: (value: string) => void
}

export function InputMonth({ className, value, onChange }: InputMonthProps) {
  const days = Array.from({ length: 12 }, (_, index) => index + 1)

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={value} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {days.map(day => (
            <SelectItem key={day} value={day.toString()}>
              Tháng {day}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
