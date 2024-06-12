import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const CATEGORIES = [
  {
    name: 'Popular',
    value: 'popular',
    rooms: [
      {
        name: 'Canmore',
        type: 'Vacation rentals'
      },
      {
        name: 'Benalmádena1',
        type: 'Apartment rentals'
      },
      {
        name: 'Benalmádena2',
        type: 'Apartment rentals'
      },
      {
        name: 'Benalmádena3',
        type: 'Apartment rentals'
      },
      {
        name: 'Benalmádena4',
        type: 'Apartment rentals'
      },
      {
        name: 'Benalmádena5',
        type: 'Apartment rentals'
      },
      {
        name: 'Benalmádena6',
        type: 'Apartment rentals'
      },
      {
        name: 'Benalmádena7',
        type: 'Apartment rentals'
      },
      {
        name: 'Benalmádena8',
        type: 'Apartment rentals'
      }
    ]
  },
  {
    name: 'Art & Culture',
    value: 'art&culture',
    rooms: []
  },
  {
    name: 'Outdoors',
    value: 'outdoors',
    rooms: []
  },
  {
    name: 'Mountains',
    value: 'mountains',
    rooms: []
  },
  {
    name: 'Beach',
    value: 'beach',
    rooms: []
  },
  {
    name: 'Unique stays',
    value: 'unique',
    rooms: []
  },
  {
    name: 'Things to do ',
    value: 'things',
    rooms: []
  },
  {
    name: 'Airbnb-friendly apartments ',
    value: 'airbnb',
    rooms: []
  }
]

export default function Footer() {
  return (
    <div className=" bg-gray-100">
      <div className="grid grid-cols-[302px_1208px_302px] px-20 py-12">
        <div className="col-start-2">
          <h2 className="mb-2 text-2xl font-medium">Inspiration for future getaways</h2>
          <Tabs defaultValue="popular" className="w-full">
            <TabsList className="flex gap-0">
              {CATEGORIES.map(category => (
                <TabsTrigger
                  key={category.value}
                  value={category.value}
                  className="p-2 pb-4 data-[state=active]:border-b-2"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            <div className="mt-8">
              {CATEGORIES.map(category => (
                <TabsContent key={category.value} value={category.value} className="grid grid-cols-6 gap-x-2 gap-y-4">
                  {category.rooms.map(room => (
                    <div key={room.name}>
                      <p>{room.name}</p>
                      <p className="text-xs text-gray-500">{room.type}</p>
                    </div>
                  ))}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-[302px_1208px_302px] px-20 py-12">
        <div className="col-start-2">
          <h1> Hello </h1>
        </div>
      </div>
    </div>
  )
}
