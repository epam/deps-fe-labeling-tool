import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import 'dayjs/locale/en-in'
import 'dayjs/locale/hi'

const locale = window.navigator.language || 'en'
dayjs.locale(locale)

export const RECOGNIZABLE_DATE_FORMATS = [
  'YYYY-MM-DD',
  'DD-MM-YYYY',
  'YYYY/MM/DD',
  'MM/DD/YYYY',
  'DD/MM/YYYY',
  'MM-DD-YYYY'
]

export const LOCALE_DATE_FORMAT = dayjs().localeData().longDateFormat('L')
export const TIME_FORMAT = dayjs().localeData().longDateFormat('LT')
export const LOCALE_DATE_TIME_FORMAT = `${LOCALE_DATE_FORMAT} ${TIME_FORMAT}`

export const toLocalizedDateString = (str, withTime = false) => {
  const format = withTime ? 'L, LT' : 'L'
  const date = dayjs(str)
  return date.isValid() ? date.format(format) : ''
}

export const stringToDayjs = (str, format) => {
  if (!str) {
    return null
  }
  if (dayjs(str, format).isValid()) {
    return dayjs(str, format)
  }
  return null
}

export const dayjsToString = (dayjsObj, format) => {
  if (!dayjsObj) {
    return ''
  }
  if (dayjsObj.format(format) === 'Invalid Date') {
    return ''
  }
  return dayjsObj.format(format)
}
