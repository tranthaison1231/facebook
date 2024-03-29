import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface InputMonthProps {
  className: string; // Định nghĩa kiểu dữ liệu của prop className là chuỗi (string)
}

export function InputMonth({ className }: InputMonthProps) {
  const days = Array.from({ length: 12 }, (_, index) => index + 1);

  return (
    <Select>
      <SelectTrigger className={className}>
        <SelectValue placeholder="1" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {days.map((day) => (
            <SelectItem key={day} value={day.toString()}>
              Tháng {day}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
