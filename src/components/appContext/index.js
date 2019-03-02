import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  filterByDate,
  filterByFree,
  filterByCategory,
  filterByArea,
  filterByTime,
  filterPastEvents,
  getDuration,
  sanitizeDates,
} from '../events/helpers'
import { itemsToLoad } from '../../constants'
import { dateFormat } from '../../constants'
import moment from 'moment'

const AppContext = React.createContext()
const { Consumer } = AppContext

function getInitialFilterState() {
  return {
    startDate: null,
    endDate: null,
    free: false,
    eventCategories: [],
    venueDetails: [],
    audience: [],
    accessibilityOptions: [],
    area: [],
    timeOfDay: [],
  }
}

const initialState = {
  events: [],
  filterOpen: null,
  eventsToShow: itemsToLoad,
  filters: getInitialFilterState(),
}

class Provider extends Component {
  constructor() {
    super()
    this.state = {
      ...initialState,
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.events !== prevState.events) {
      // Generate all recurrences of events
      const allEventOccurences = []
      // Map over events
      nextProps.events.map(event => {
        if (!event.node.recurrenceDates) {
          allEventOccurences.push(event)
        } else {
          const recurrenceDates = sanitizeDates([
            moment(event.node.startTime).format(dateFormat),
            ...event.node.recurrenceDates,
          ])
          const time = moment(event.node.startTime)
          const duration = getDuration(event.node.startTime, event.node.endTime)

          recurrenceDates.forEach(date => {
            // Deep clone event
            const copy = JSON.parse(JSON.stringify(event))

            // Modify start time and end time
            copy.node.startTime = moment(date)
              .minutes(time.minutes())
              .hours(time.hours())
              .format()

            copy.node.endTime = moment(copy.node.startTime)
              .add(duration, 'milliseconds')
              .format()
            copy.node.id = `${event.node.id}-${moment(date).format('YYYYMMDD')}`

            allEventOccurences.push(copy)
          })
        }
      })

      const events = allEventOccurences.filter(filterPastEvents)

      events.sort(
        (eventA, eventB) =>
          moment(eventA.node.startTime).unix() -
          moment(eventB.node.startTime).unix()
      )

      return { events }
    }
  }

  getDatepickerValues = ({ startDate, endDate }) => {
    this.setState(prevState => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        startDate: startDate ? startDate.toISOString() : null,
        endDate: endDate ? endDate.toISOString() : null,
      },
    }))
  }

  setDate = (dateToSet, dateToGet) => {
    this.setState(prevState => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        [dateToSet]: prevState.filters[dateToGet],
      },
    }))
  }

  getCheckboxBool = (name, checked) => {
    this.setState(prevState => ({
      ...prevState,
      filters: {
        ...prevState.filters,
        free: checked,
      },
    }))
  }

  getCheckboxSetValues = (e, name) => {
    const state = {
      ...this.state,
      filters: { ...this.state.filters },
    }

    if (
      e.target.checked &&
      state.filters[name].indexOf(e.target.value) === -1
    ) {
      state.filters[name].push(e.target.value)
    } else {
      const index = state.filters[name].indexOf(e.target.value)
      if (index > -1) {
        this.state.filters[name].splice(index, 1)
      }
    }

    this.setState(state)
  }

  clearFilters = () => {
    this.setState({
      ...this.state,
      filterOpen: null,
      filters: getInitialFilterState(),
    })
  }

  closeSiblingFilters = (filterName, isOpen) => {
    if (isOpen && filterName != this.state.openFilter) {
      this.setState(prevState => ({
        ...prevState,
        filterOpen: filterName,
      }))
    } else {
      this.setState(prevState => ({
        ...prevState,
        filterOpen: null,
      }))
    }
  }

  previousFilters = null
  previousFilteredEvents = null

  filterEvents = () => {
    if (this.state.filters === this.previousFilters) {
      return this.previousFilteredEvents
    }
    this.previousFilters = this.state.filters
    this.previousFilteredEvents = this.state.events.filter(
      event =>
        filterByCategory(
          event,
          'eventCategories',
          this.state.filters.eventCategories
        ) &&
        filterByCategory(
          event,
          'venueDetails',
          this.state.filters.venueDetails
        ) &&
        filterByCategory(
          event,
          'accessibilityOptions',
          this.state.filters.accessibilityOptions
        ) &&
        filterByCategory(event, 'audience', this.state.filters.audience) &&
        filterByDate(
          event,
          this.state.filters.startDate,
          this.state.filters.endDate
        ) &&
        (!this.state.filters.free || filterByFree(event)) &&
        filterByArea(event, this.state.filters.area) &&
        filterByTime(event, this.state.filters.timeOfDay)
    )

    return this.previousFilteredEvents
  }

  showMore = filteredCount => {
    if (this.state.eventsToShow < filteredCount) {
      this.setState({ eventsToShow: this.state.eventsToShow + itemsToLoad })
    }
  }

  render() {
    return (
      <AppContext.Provider
        value={{
          state: this.state,
          filteredEvents: this.filterEvents(),
          actions: {
            getCheckboxBool: this.getCheckboxBool,
            getDatepickerValues: this.getDatepickerValues,
            getCheckboxSetValues: this.getCheckboxSetValues,
            clearFilters: this.clearFilters,
            closeSiblingFilters: this.closeSiblingFilters,
            showMore: this.showMore,
            setDate: this.setDate,
          },
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    )
  }
}

Provider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  events: PropTypes.array,
}

Provider.defaultProps = {
  events: [],
}

module.exports = {
  Provider,
  Consumer,
}
