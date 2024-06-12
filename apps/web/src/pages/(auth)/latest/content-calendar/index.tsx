import { Calendar, dayjsLocalizer, Views, View } from 'react-big-calendar'
import dayjs from 'dayjs'
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

const localizer = dayjsLocalizer(dayjs)

export default function Planner() {
  const [view, setView] = useState<View>(Views.WEEK)
  return (
    <div className="bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <div className="space-x-2">
          <Button variant={view === Views.WEEK ? 'default' : 'outline'} onClick={() => setView(Views.WEEK)}>
            Week{' '}
          </Button>
          <Button variant={view === Views.MONTH ? 'default' : 'outline'} onClick={() => setView(Views.MONTH)}>
            Month{' '}
          </Button>
        </div>
        <div className="text-2xl">
          <strong>{dayjs().format('MMMM')} </strong> {dayjs().format('YYYY')}
        </div>
        <div>Hello</div>
      </div>
      <div className="flex">
        <div className="[&_.rbc-current]:text-blue-500 [&_.rbc-toolbar]:hidden">
          <Calendar
            localizer={localizer}
            events={[]}
            view={view}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600, minWidth: 770 }}
            onSelectEvent={() => {
              window.alert('Hello')
            }}
            onSelectSlot={() => {
              window.prompt('New Event name')
            }}
            selectable
          />
        </div>
        <div className="p-4 ">Right Side</div>
      </div>
    </div>
  )
}
