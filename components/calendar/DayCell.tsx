import { cn } from '@/lib/calendar'

interface DayCellProps {
  date: Date
  isToday: boolean
  isWeekend: boolean
  isStart: boolean
  isEnd: boolean
  inRange: boolean
  isHovered: boolean
  holiday: string | null
  onClick: () => void
  onHover: () => void
  onLeave: () => void
}

export default function DayCell({
  date, isToday, isWeekend, isStart, isEnd, inRange,
  isHovered, holiday, onClick, onHover, onLeave,
}: DayCellProps) {
  const isSelected = isStart || isEnd

  return (
    <div
      className={cn('day-cell relative flex items-center justify-center transition-colors')}
      style={{
        aspectRatio: '1',
        borderRadius: isStart ? '3px 0 0 3px' : isEnd ? '0 3px 3px 0' : undefined,
        background: isSelected
          ? 'var(--text-main)'
          : inRange
          ? 'var(--bg-range-mid)'
          : isHovered
          ? 'var(--bg-hover)'
          : undefined,
      }}
      onClick={onClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      title={holiday || undefined}
    >
      <span
        className={cn('day-number text-xs md:text-sm transition-transform duration-150 leading-none')}
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontWeight: isToday ? '600' : '400',
          color: isSelected
            ? 'var(--bg-card)'
            : isWeekend
            ? 'var(--accent)'
            : isToday
            ? 'var(--text-main)'
            : 'var(--text-muted)',
          fontSize: '0.78rem',
        }}
      >
        {date.getDate()}
      </span>

      {isToday && !isSelected && (
        <span
          className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
          style={{ background: 'var(--accent)' }}
        />
      )}

      {holiday && !isSelected && (
        <span
          className="absolute top-0.5 right-0.5 w-1 h-1 rounded-full"
          style={{ background: 'var(--accent)', opacity: 0.6 }}
        />
      )}
    </div>
  )
}