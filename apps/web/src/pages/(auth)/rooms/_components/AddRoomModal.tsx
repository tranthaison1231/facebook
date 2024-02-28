import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createRoomSchema } from '@/utils/schema'
import { CreateRoomInputs, createRoom } from '@/apis/rooms'
import { toast } from 'sonner'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

export default function AddRoomModal() {
  const queryClient = useQueryClient()
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateRoomInputs>({
    mode: 'onBlur',
    resolver: zodResolver(createRoomSchema)
  })

  const onSubmit = async (data: CreateRoomInputs) => {
    try {
      setIsLoading(true)
      await createRoom(data)
      queryClient.invalidateQueries({
        queryKey: ['rooms']
      })
      toast.success('Create room successfully!')
      setOpen(false)
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={() => setOpen(true)}>
        <Button> Create </Button>
      </DialogTrigger>
      <DialogContent className="px-0 sm:max-w-[600px]">
        <h2 className="text-center font-bold"> Create Room</h2>
        <hr />
        <form className="space-y-4 p-6" onSubmit={handleSubmit(onSubmit)}>
          <Input {...register('name')} placeholder="Name" />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          <Input {...register('price')} placeholder="Price" type="number" />
          {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
          <Input {...register('location')} placeholder="Location" />
          {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
          <Textarea {...register('description')} placeholder="Description" />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
          <Button loading={isLoading} className="w-full" size="lg" type="submit">
            Save
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
