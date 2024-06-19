import { zodResolver } from '@hookform/resolvers/zod'
import CreateGroupForm from './_components/CreateGroupForm'
import PreviewGroup from './_components/PreviewGroup'
import { createGroupInputs, createGroupSchema } from '@/utils/schema'
import { useForm } from 'react-hook-form'

export default function Create() {
  const form = useForm<createGroupInputs>({
    mode: 'onBlur',
    resolver: zodResolver(createGroupSchema)
  })

  const name = form.watch('name')
  const type = form.watch('type')

  return (
    <div className="w-full">
      <div className="fixed h-[calc(100vh-4.6rem)] w-90 border bg-white p-5 shadow-md">
        <CreateGroupForm form={form} />
      </div>
      <div className="ml-90">
        <PreviewGroup name={name} type={type} />
      </div>
    </div>
  )
}
