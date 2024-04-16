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

interface InputYearProps {
  className: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void; // Thêm prop onChange
}
  

export function InputYear({ className }: InputYearProps) {
  const years = Array.from({ length: 2050 - 1850 + 1 }, (_, index) => 1850 + index);

  return (
    <Select>
      <SelectTrigger className={className}>
        <SelectValue placeholder="2024" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
