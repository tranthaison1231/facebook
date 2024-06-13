import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'


function inbox() {
  return (
    <div className=' w-full flex justify-between bg-[#f0f2f5]'>
        <div className='w-1/4'></div>
        <div className='w-1/2 bg-white rounded-md min-h-72 p-6'>
            <Tabs defaultValue="seller" className="w-[400px]">
                <TabsList>
                <TabsTrigger value="seller">Bán hàng</TabsTrigger>
                <TabsTrigger value="buyer">Mua hàng</TabsTrigger>
                </TabsList>
                <TabsContent value="seller">Make changes to your account here.</TabsContent>
                <TabsContent value="buyer">Change your password here.</TabsContent>
            </Tabs>
            
        </div>
        <div className='w-1/4'></div>
    </div>
  )
}

export default inbox
