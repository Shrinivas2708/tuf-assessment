import {
  DateRange, DAYS_SHORT, getDaysInMonth, getMonthStartOffset,
  isSameDay, isRangeStart, isRangeEnd, isInRange, getHoliday, formatDateKey
} from '@/lib/calendar'
import DayCell from './DayCell'

const TODAY = new Date()

interface CalendarGridProps {
  viewYear: number
  viewMonth: number
  range: DateRange
  effectiveRange: DateRange
  hoverDate: Date | null
  selecting: boolean
  rangeLabel: string
  onDayClick: (date: Date) => void
  onDayHover: (date: Date | null) => void
  onClearRange: () => void
  monthAnimKey: number
}

export default function CalendarGrid({
  viewYear, viewMonth, range, effectiveRange, hoverDate, selecting,
  rangeLabel, onDayClick, onDayHover, onClearRange, monthAnimKey
}: CalendarGridProps) {
  
  const days = getDaysInMonth(viewYear, viewMonth)
  const offset = getMonthStartOffset(viewYear, viewMonth)
  const gridCells = [...Array(offset).fill(null), ...days]

  return (
    <div className="p-5 md:p-6 border-b" style={{ borderColor: 'var(--border-color)' }}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div
            className="w-2 h-2 rounded-full transition-colors"
            style={{ background: range.start ? 'var(--text-main)' : 'var(--border-color)' }}
          />
          <span
            className="text-xs transition-colors"
            style={{
              fontFamily: 'var(--font-dm-mono)',
              color: range.start ? 'var(--text-main)' : 'var(--text-faint)',
              letterSpacing: '0.02em',
            }}
          >
            {rangeLabel}
          </span>
        </div>
        {(range.start || range.end) && (
          <button
            onClick={onClearRange}
            className="text-xs transition-colors hover:opacity-70"
            style={{ fontFamily: 'var(--font-dm-sans)', color: 'var(--text-faint)' }}
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAYS_SHORT.map((d, i) => (
          <div
            key={d}
            className="text-center py-1 transition-colors"
            style={{
              fontFamily: 'var(--font-dm-mono)',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              color: i >= 5 ? 'var(--accent)' : 'var(--text-faint)',
              textTransform: 'uppercase',
            }}
          >
            {d}
          </div>
        ))}
      </div>

      <div key={monthAnimKey} className="grid grid-cols-7 month-grid">
        {gridCells.map((date, idx) => {
          if (!date) return <div key={`empty-${idx}`} className="aspect-square" />

          const isToday = isSameDay(date, TODAY)
          const isWeekend = date.getDay() === 0 || date.getDay() === 6
          const isStart = isRangeStart(date, effectiveRange)
          const isEnd = isRangeEnd(date, effectiveRange)
          const inRange = isInRange(date, effectiveRange)
          const holiday = getHoliday(date)
          const isHovered = hoverDate ? isSameDay(date, hoverDate) : false

          return (
            <DayCell
              key={formatDateKey(date)}
              date={date}
              isToday={isToday}
              isWeekend={isWeekend}
              isStart={isStart}
              isEnd={isEnd}
              inRange={inRange}
              isHovered={isHovered && selecting}
              holiday={holiday}
              onClick={() => onDayClick(date)}
              onHover={() => onDayHover(date)}
              onLeave={() => onDayHover(null)}
            />
          )
        })}
      </div>
    </div>
  )
}