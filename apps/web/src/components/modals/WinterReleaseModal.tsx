import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'

export default function WinterReleaseModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="my-2 flex w-full cursor-pointer items-center justify-between p-3  hover:bg-gray-100">
          <span>Winter Release Features </span> <span className="rounded-sm bg-primary p-0.5 text-white"> News </span>
        </div>
      </DialogTrigger>
      <DialogContent className="p-6 sm:max-w-[600px]">Winter Release</DialogContent>
    </Dialog>
  )
}
