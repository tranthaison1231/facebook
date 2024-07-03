import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Earth, Lock } from 'lucide-react'

const OPTIONS = [
  {
    value: 'PUBLIC',
    label: 'Public',
    description: "Anyone can see who's in the group and what they post.",
    icon: <Earth />
  },
  {
    value: 'PRIVATE',
    label: 'Private',
    description: "Only members can see who's in the group and what they post.",
    icon: <Lock />
  }
]

interface PrivacySelectorProps {
  value: string
  onChange: (value: string) => void
}

function PrivacySelector({ onChange, value }: PrivacySelectorProps) {
  const selectIndex = value === 'PUBLIC' ? 0 : 1

  return (
    <Select onValueChange={onChange} defaultValue={value}>
      <SelectTrigger className="group py-8 text-base text-secondaryColor data-[state=open]:ring-2 [&>p]:text-muted-foreground [&_p:first-child]:data-[state=open]:text-primary [&_p:nth-child(2)]:text-foreground">
        <SelectValue placeholder="Choose privacy" className="placeholder:text-red-500">
          <div className="flex items-center gap-4">
            {OPTIONS[selectIndex].icon}
            <div className="text-left">
              <p className="text-xs">Choose privacy</p>
              <p>{OPTIONS[selectIndex].label}</p>
            </div>
          </div>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="w-80">
          {OPTIONS.map(option => (
            <SelectItem value={option.value} key={option.value}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondaryColor/10 p-2">
                  {option.icon}
                </div>
                <div className="text-left">
                  <p className="text-md font-bold">{option.label}</p>
                  <p className="text-xs">{option.description}</p>
                </div>
              </div>
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default PrivacySelector
