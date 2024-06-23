import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface InputDayProps {
  className: string // Định nghĩa kiểu dữ liệu của prop className là chuỗi (string)
  value: string
  onChange: (value: string) => void
}

export function InputDay({ className, value, onChange }: InputDayProps) {
  const days = Array.from({ length: 31 }, (_, index) => index + 1)

  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={`${value}`} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {days.map(day => (
            <SelectItem key={day} value={day.toString()}>
              {day}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
