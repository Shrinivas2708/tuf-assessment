export type DateValue = Date | null

export interface DateRange {
  start: DateValue
  end: DateValue
}

export interface Note {
  id: string
  text: string
  date?: string 
  color?: string
}

export const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

export const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
]

export const MONTH_IMAGES: Record<number, { url: string; credit: string; location: string }> = {
  0: { url: 'https://images.unsplash.com/photo-1483664852095-d6cc6870702d?w=800&q=80', credit: 'Eberhard Grossgasteiger', location: 'Deep Winter Snow' },
  1: { url: 'https://images.unsplash.com/photo-1453306458620-5bbef13a5bca?w=800&q=80', credit: 'Simon Matzinger', location: 'Frost & Ice' },
  2: { url: 'https://images.unsplash.com/photo-1709733124974-ba3af0fd455a?w=800&q=80', credit: 'Ramona Edwards', location: 'Spring Showers' },
  3: { url: 'https://images.unsplash.com/photo-1603877466401-9cbc7138f91f?w=800&q=80', credit: 'Stephen Paterson', location: 'Spring Bloom' },
  4: { url: 'https://images.unsplash.com/photo-1464013778555-8e723c2f01f8?w=800&q=80', credit: 'Paul Carmona', location: 'Sunlit Forest' },
  5: { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', credit: 'Sean Oulashin', location: 'Summer Coast' },
  6: { url: 'https://images.unsplash.com/photo-1523766775147-152d0d6e2adb?w=800&q=80', credit: 'Zoltan Tasi', location: 'High Summer Sky' },
  7: { url: 'https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800&q=80', credit: 'Paz Arando', location: 'Golden Harvest' },
  8: { url: 'https://plus.unsplash.com/premium_photo-1668967516060-624b8a7021f4?w=800&q=80', credit: 'John Lee', location: 'Crisp Autumn Air' },
  9: { url: 'https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=800&q=80', credit: 'Jeremy Thomas', location: 'Fall Foliage' },
  10: { url: 'https://images.unsplash.com/photo-1731686309439-401f4b9b6801?w=800&q=80', credit: 'Eberhard Grossgasteiger', location: 'November Fog' },
  11: { url: 'https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80', credit: 'Aaron Burden', location: 'Winter Festivities' },
}

export function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = []
  const date = new Date(year, month, 1)
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

export function getMonthStartOffset(year: number, month: number): number {
  const firstDay = new Date(year, month, 1).getDay()
  return firstDay === 0 ? 6 : firstDay - 1
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}

export function isInRange(date: Date, range: DateRange): boolean {
  if (!range.start || !range.end) return false
  const start = range.start < range.end ? range.start : range.end
  const end = range.start < range.end ? range.end : range.start
  return date > start && date < end
}

export function isRangeStart(date: Date, range: DateRange): boolean {
  if (!range.start) return false
  const start = range.start && range.end && range.start > range.end ? range.end : range.start
  return isSameDay(date, start)
}

export function isRangeEnd(date: Date, range: DateRange): boolean {
  if (!range.end || !range.start) return false
  const end = range.start > range.end ? range.start : range.end
  return isSameDay(date, end)
}

export function formatDate(date: Date): string {
  return `${MONTHS_SHORT[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`
}

export function formatDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export const HOLIDAYS: Record<string, string> = {
  '01-01': "New Year's Day",
  '02-14': "Valentine's Day",
  '03-17': "St. Patrick's Day",
  '04-22': "Earth Day",
  '05-05': "Cinco de Mayo",
  '06-21': "Summer Solstice",
  '07-04': "Independence Day",
  '10-31': "Halloween",
  '11-11': "Veterans Day",
  '12-25': "Christmas",
  '12-31': "New Year's Eve",
}

export function getHoliday(date: Date): string | null {
  const key = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
  return HOLIDAYS[key] || null
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}