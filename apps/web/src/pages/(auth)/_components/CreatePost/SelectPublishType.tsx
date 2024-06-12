import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ArrowLeft, Globe } from 'lucide-react'

interface SelectPublishTypeProps {
  onBack: () => void
  onValueChange: (value: string) => void
}

export default function SelectPublishType({ onBack, onValueChange }: SelectPublishTypeProps) {
  return (
    <div>
      <>
        <div className="flex justify-between p-4 text-xl font-bold">
          <Button onClick={onBack} size="icon" variant="secondary">
            <ArrowLeft className="text-black" />
          </Button>
          <h3>Post audience</h3>
          <div />
        </div>
        <hr className="bg-gray-300"></hr>
        <div className="p-4">
          <h2 className="font-bold">Who can see your post?</h2>
          <p>
            Your post will appear in Feed, on your profile and in search results. Your default audience is set to
            Public, but you can change the audience of this specific post
          </p>
          <RadioGroup onValueChange={onValueChange}>
            <Label className="flex justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <div>
                  <p>Public</p>
                  <p>Anyone on or off Facebook</p>
                </div>
              </div>
              <RadioGroupItem value="PUBLIC" />
            </Label>
            <Label className="flex justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                <div>
                  <p>Only Me</p>
                  <p>Anyone on or off Facebook</p>
                </div>
              </div>
              <RadioGroupItem value="ONLY_ME" />
            </Label>
          </RadioGroup>
        </div>
      </>
    </div>
  )
}
