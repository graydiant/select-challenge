import dayjs from 'dayjs'
import en from 'dayjs/locale/en'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.locale({
  ...en,
  weekStart: 1,
})

export function utcNow() {
  return dayjs().utc()
}

export function utcToday() {
  return utcNow().startOf('day')
}
