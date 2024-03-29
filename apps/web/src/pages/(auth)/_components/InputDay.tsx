import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface InputDayProps {
    className: string; // Định nghĩa kiểu dữ liệu của prop className là chuỗi (string)
  }
  

export function InputDay({ className }: InputDayProps) {
  const days = Array.from({ length: 31 }, (_, index) => index + 1);

  return (
    <Select>
      <SelectTrigger className={className}>
        <SelectValue placeholder="1" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {days.map((day) => (
            <SelectItem key={day} value={day.toString()}>
              {day}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
