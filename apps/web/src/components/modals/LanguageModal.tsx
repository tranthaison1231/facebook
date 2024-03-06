import { Globe } from 'lucide-react'
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

export default function LanguageModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Globe />
      </DialogTrigger>
      <DialogContent className="px-6 pt-16 sm:max-w-[888px]">
        <Tabs defaultValue="language">
          <TabsList>
            <TabsTrigger value="language">Language and region</TabsTrigger>
            <TabsTrigger value="currency">Currency</TabsTrigger>
          </TabsList>
          <TabsContent value="language">
            <div className="my-8 flex w-fit items-center gap-4 rounded-sm bg-gray-100 p-4">
              <div className="flex flex-col gap-2">
                <p>Translation</p>
                <p className="text-muted-foreground">Automatically translate descriptions and reviews to English.</p>
              </div>
              <h1> Checkbox</h1>
            </div>
          </TabsContent>
          <TabsContent value="currency"></TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
