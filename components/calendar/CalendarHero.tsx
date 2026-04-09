/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from 'react'
import { MONTHS, MONTH_IMAGES, cn } from '@/lib/calendar'
import Image from 'next/image'
interface CalendarHeroProps {
  viewYear: number
  viewMonth: number
  onChangeMonth: (delta: number) => void
}

export default function CalendarHero({ viewYear, viewMonth, onChangeMonth }: CalendarHeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const monthImage = MONTH_IMAGES[viewMonth]

  // Reset loading state when month changes
  useEffect(() => {
    setImageLoaded(false)
  }, [viewMonth, viewYear])

  return (
    <div className="lg:w-2/5 relative overflow-hidden" style={{ minHeight: '280px' }}>
      <Image
        key={`${viewMonth}-${viewYear}`}
        src={monthImage.url}
        alt={monthImage.location}
        className={cn(
          'absolute inset-0 w-full h-full object-cover transition-opacity duration-700',
          imageLoaded ? 'opacity-100' : 'opacity-0'
        )}
        onLoad={() => setImageLoaded(true)}
      />
      {!imageLoaded && (
        <div className="absolute inset-0 animate-pulse" style={{ backgroundColor: 'var(--border-faint)' }} />
      )}
      <div className="hero-gradient absolute inset-0" />

      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <div className="flex items-end justify-between">
          <div>
            <p
              className="text-white/70 text-xs tracking-[0.2em] uppercase mb-0.5"
              style={{ fontFamily: 'var(--font-dm-mono)' }}
            >
              {viewYear}
            </p>
            <h2
              className="text-white text-4xl leading-none"
              style={{ fontFamily: 'var(--font-playfair)', fontWeight: 600 }}
            >
              {MONTHS[viewMonth]}
            </h2>
          </div>
          <p
            className="text-white/60 text-xs text-right"
            style={{ fontFamily: 'var(--font-dm-sans)', maxWidth: '120px' }}
          >
            {monthImage.location}
            <br />
            <span className="text-white/40">— {monthImage.credit}</span>
          </p>
        </div>
      </div>

      <div className="absolute top-3 left-0 right-0 flex justify-between px-3 z-10">
        <button
          onClick={() => onChangeMonth(-1)}
          className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all backdrop-blur-md text-sm"
        >
          ‹
        </button>
        <button
          onClick={() => onChangeMonth(1)}
          className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-all backdrop-blur-md text-sm"
        >
          ›
        </button>
      </div>
    </div>
  )
}