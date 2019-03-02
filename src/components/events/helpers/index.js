const moment = require('moment')

const formatPrice = (eventPriceLow, eventPriceHigh) => {
  if (eventPriceLow === 0 && (eventPriceHigh === 0 || eventPriceHigh == null)) {
    return 'Free'
  }
  return `From £${eventPriceLow.toFixed(2).replace('.00', '')}`
}

const formatTime = time => {
  if (moment(time).format('mm') === '00') {
    return moment(time).format('ha')
  }
  return moment(time).format('h:mma')
}

const formatDate = event => {
  const year = moment(event.startTime).year()

  const startDate = moment(event.startTime).format('L')
  const endDate = moment(event.endTime).format('L')

  const startMonth = moment(event.startTime).format('MMM')
  const endMonth = moment(event.endTime).format('MMM')

  const startDay = moment(event.startTime).date()
  const endDay = moment(event.endTime).date()

  const startTime = formatTime(event.startTime)
  const endTime = formatTime(event.endTime)

  const dateTime = {}

  switch (true) {
    case startDate === endDate && startTime === endTime:
      dateTime.date = `${startDay} ${startMonth} ${year}`
      dateTime.time = `${startTime}`
      break
    case startDate === endDate:
      dateTime.date = `${startDay} ${startMonth} ${year}`
      dateTime.time = `${startTime} - ${endTime}`
      break
    case startMonth === endMonth:
      dateTime.date = `${startDay} - ${endDay} ${startMonth} ${year}`
      dateTime.time = `${startTime} - ${endTime}`
    default:
      dateTime.date = `${startDay} ${startMonth} - ${endDay} ${endMonth} ${year}`
      dateTime.time = `${startTime} - ${endTime}`
  }

  return dateTime
}

function filterByDate(event, startDate, endDate) {
  return (
    !startDate ||
    !endDate ||
    moment(event.node.startTime)
      .set({ hour: 12, minutes: 0 })
      .isBetween(startDate, endDate, null, '[]')
  )
}

function filterByFree(event) {
  return event.node.eventPriceLow === 0
}

function filterByCategory(event, key, categories) {
  return (
    !categories ||
    categories.length === 0 ||
    categories.some(category => {
      return (
        Array.isArray(event.node[key]) && event.node[key].indexOf(category) >= 0
      )
    })
  )
}

function filterByArea(event, areas) {
  if (areas.length === 0) {
    return true
  }

  if (typeof event.node.postcode === 'string') {
    let area
    const postcode = event.node.postcode.toLowerCase()
    switch (true) {
      case postcode.lastIndexOf('wc', 0) === 0 ||
        postcode.lastIndexOf('ec', 0) === 0:
        area = 'Central'
        break
      case postcode.lastIndexOf('w', 0) === 0:
        area = 'West'
        break
      case postcode.lastIndexOf('e', 0) === 0:
        area = 'East'
        break
      case postcode.lastIndexOf('s', 0) === 0:
        area = 'South'
        break
      case postcode.lastIndexOf('n', 0) === 0:
        area = 'North'
        break
      default:
        return false
    }
    return areas.indexOf(area) !== -1
  }
  return false
}

function filterByTime(event, times) {
  if (times.length === 0) {
    return true
  }

  const format = 'HH:mm'
  const startTime = moment(event.node.startTime).format(format)
  const afternoonStart = '12:00'
  const afternoonEnd = '17:59'

  let timeOfDay

  switch (true) {
    case startTime < afternoonStart:
      timeOfDay = 'Morning'
      break
    case startTime >= afternoonStart && startTime <= afternoonEnd:
      timeOfDay = 'Afternoon'
      break
    case startTime > afternoonEnd:
      timeOfDay = 'Evening'
      break
    default:
      return false
  }
  return times.indexOf(timeOfDay) !== -1
}

function filterPastEvents(event) {
  const today = moment()
  return moment(event.node.startTime).isSameOrAfter(today)
}

function filterByLimit(event, index) {
  return index < this
}

function sanitizeDates(dates) {
  const formattedDates = dates.map(date => {
    const [day, month, year] = date.split('/').map(Number)
    return moment([year, month - 1, day]).toISOString()
  })
  // Strip duplicates and return
  return Array.from(new Set([...formattedDates]))
}

function getDuration(start, end) {
  return moment(end).diff(moment(start))
}

module.exports = {
  formatDate,
  formatTime,
  filterByDate,
  filterByFree,
  filterByCategory,
  filterByArea,
  filterByTime,
  filterPastEvents,
  filterByLimit,
  sanitizeDates,
  getDuration,
  formatPrice,
}
