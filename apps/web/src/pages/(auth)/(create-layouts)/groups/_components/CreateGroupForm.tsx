import { Input } from '@/components/ui/input'
import { cn } from '@/utils/cn'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { Link, useNavigate } from '@/router'
import { User } from '@/apis/auth'
import { createGroupInputs } from '@/utils/schema'
import { toast } from 'sonner'
import { AxiosError } from 'axios'
import { createGroup, Group } from '@/apis/groups'
import { useOutletContext } from 'react-router-dom'
import { UseFormReturn } from 'react-hook-form'
import PrivacySelector from './PrivacySelector'
import { FormField } from '@/components/ui/form'

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
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const isEnableSubmit = form.watch('name') && form.watch('type')

  const onSubmit = async (data: createGroupInputs) => {
    try {
      console.log(data)
      setIsLoading(true)
      const res: Group = {
        userId: me.id,
        ...data
      }
      await createGroup(res)
      toast.success('Group created successfully!')
      navigate('/groups/feed') //Navigate to group detail page & remember fix route
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

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
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => <PrivacySelector onChange={field.onChange} value={field.value} />}
          />
          {errors.type && <p className="text-sm text-red-500">{errors.type.message}</p>}

          <Input
            className={cn('px-4 pb-4 pt-6 text-base placeholder:absolute placeholder:top-5 focus:ring-2')}
            placeholder="Enter names or email addresses"
          />
        </div>
        <Button disabled={!isEnableSubmit} className="mt-6 w-full" type="submit" loading={isLoading}>
          Create
        </Button>
      </form>
    </div>
  )
}
