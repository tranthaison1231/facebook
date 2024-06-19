import { Input } from '@/components/ui/input'
import { cn } from '@/utils/cn'
import { Earth, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ReactElement, useState } from 'react'
import { Link } from '@/router'
import { User } from '@/apis/auth'
import { createGroupInputs } from '@/utils/schema'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { createGroup, Group } from '@/apis/groups'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useOutletContext } from 'react-router-dom'
import { UseFormReturn } from 'react-hook-form'

const privacyOption = [
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

interface CreateGroupFormProps {
  form: UseFormReturn<createGroupInputs, unknown, undefined>
}

export default function CreateGroupForm({ form }: CreateGroupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = form

  const { me } = useOutletContext<{ me: User }>()

  const [isFocusGroupName, setIsFocusGroupName] = useState(false)
  const [isFocusInvite, setIsFocusInvite] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')

  const handleSelect = (value: string) => {
    const selected = privacyOption.find(option => option.value === value)
    setSelectedOption(selected ? selected.value : '')
  }

  const onSubmit = async (data: createGroupInputs) => {
    try {
      setIsLoading(true)
      const res: Group = {
        userId: me.id,
        ...data
      }
      await createGroup(res)
      toast.success('Group created successfully!')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  const Privacy: ReactElement = (
    <div className="flex items-center justify-center gap-5 text-black group-data-[state=open]:text-black">
      {selectedOption === 'PUBLIC' ? <Earth /> : <Lock />}
      <div className="flex flex-col text-left">
        <p className="text-xs text-primary">Choose privacy</p>
        <p className="text-md">{selectedOption === 'PUBLIC' ? 'Public' : 'Private'}</p>
      </div>
    </div>
  )

  return (
    <div className="flex h-full flex-col">
      <div>
        <div>
          <p className="text-xs">
            <Link to="/groups/feed" className="hover:underline">
              Groups
            </Link>
            <span> {'>'} Create group</span>
          </p>
          <h1 className="text-2xl font-bold">Create group</h1>
        </div>
        <div className="flex items-center gap-5">
          <img className="h-10 w-10 rounded-full object-cover" src={me?.avatar} alt="" />
          <div className="my-6">
            <p className="text-md font-medium">{me?.firstName + ' ' + me?.lastName}</p>
            <p className="text-xs">Admin</p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex h-full flex-col justify-between">
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Input
              {...register('name')}
              onFocus={() => setIsFocusGroupName(true)}
              onBlur={() => setIsFocusGroupName(false)}
              className="px-4 pb-4 pt-6 text-base placeholder:absolute placeholder:top-5 focus:ring-2"
              placeholder={isFocusGroupName ? '' : 'Group name'}
              type="text"
            />
            <p className={cn('hidden', { 'absolute left-5 top-1 block text-xs text-primary': isFocusGroupName })}>
              Group name
            </p>

            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>

          <Select onValueChange={handleSelect}>
            <SelectTrigger
              {...register('type')}
              className="group py-8 text-base data-[state=open]:ring-2 [&>span]:text-muted-foreground [&>span]:data-[state=open]:text-primary"
              value={selectedOption}
            >
              <SelectValue placeholder="Choose privacy">{Privacy}</SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className="w-80">
                {privacyOption.map(option => (
                  <SelectItem value={option.value} key={option.value}>
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/50 p-2">
                        {option.icon}
                      </div>
                      <div>
                        <p className="text-md font-bold">{option.label}</p>
                        <p className="text-xs">{option.description}</p>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
            {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}
          </Select>
          <div className="relative">
            <Input
              onFocus={() => setIsFocusInvite(true)}
              onBlur={() => setIsFocusInvite(false)}
              className={cn('px-4 pb-4 pt-6 text-base placeholder:absolute placeholder:top-5 focus:ring-2', {
                'placeholder:top-6': isFocusInvite
              })}
              placeholder={isFocusInvite ? 'Enter names or email addresses' : 'Invite friends (optional)'}
            />
            <p className={cn('hidden', { 'absolute left-5 top-1 block text-xs text-primary': isFocusInvite })}>
              Invite friends
            </p>
          </div>
        </div>
        <Button className="mt-6 w-full" type="submit" loading={isLoading}>
          Create
        </Button>
      </form>
    </div>
  )
}
