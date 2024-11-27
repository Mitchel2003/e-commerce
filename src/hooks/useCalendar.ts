import { CardDay, EventMaintenance } from '@/types/dashboard.type'
import { useState, useMemo } from 'react'

const useCalendar = (events: EventMaintenance[]) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const daysArray: CardDay[] = []

    for (let day = 1; day <= new Date(year, month + 1, 0).getDate(); day++) {
      const date = new Date(year, month, day)
      daysArray.push({
        date,
        events: events.filter(event =>
          event.date.getFullYear() === year &&
          event.date.getMonth() === month &&
          event.date.getDate() === day
        )
      })
    }

    return daysArray
  }, [currentMonth, events])

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  return { daysInMonth, currentMonth, nextMonth, prevMonth }
}

export default useCalendar