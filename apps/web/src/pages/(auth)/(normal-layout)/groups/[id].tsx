import { getGroup } from '@/apis/groups'
import { Button } from '@/components/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useParams } from '@/router'
import { useQuery } from '@tanstack/react-query'
import { ChevronDown } from 'lucide-react'
import { useMemo } from 'react'

enum Tab {
  About = 'About',
  Discussion = 'Discussion',
  Featured = 'Featured'
}

export default function Group() {
  const { id } = useParams('/groups/:id')

  const { data, isLoading } = useQuery({
    queryKey: ['groups'],
    queryFn: () => getGroup(id)
  })

  const TABS = [
    {
      name: 'About',
      value: Tab.About
    },
    {
      name: 'Discussion',
      value: Tab.Discussion
    },
    {
      name: 'Featured',
      value: Tab.Featured
    }
  ]

  const TABS_RENDER = useMemo(() => {
    if (!data?.isJoined && data?.type === 'PRIVATE') {
      return TABS.slice(0, 2)
    }
    return TABS
  }, [data])

  if (isLoading) {
    return <div> Loading... </div>
  }

  return (
    <div className="bg-white">
      <img src={data?.background} alt={data?.background} className="h-112 w-full object-cover" />
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold hover:underline">{data?.name}</h1>
            <p className="flex text-sm text-gray-500">
              <p className="lowercase first-letter:uppercase">{data?.type} group</p>
              <span className="ml-4 font-bold">{data?.totalMember} members</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button> {data?.isJoined ? 'Joined' : 'Join Group'} </Button>
            <Button> Share </Button>
            <Button>
              <ChevronDown />
            </Button>
          </div>
        </div>
        <hr className="my-4" />
        <div>
          <Tabs defaultValue={Tab.About} className="w-[400px]">
            <TabsList className="flex w-full">
              {TABS_RENDER.map(tab => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
