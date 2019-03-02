/* eslint-disable prettier/prettier */
import React from 'react'
import PropTypes from 'prop-types'
import EventScheduleItem from './eventScheduleItem'
import moment from 'moment'

const splitIntoArray = schedule =>
  schedule.reduce(
    (acc, item) => {
      if (
        moment(item.startTime).isBefore(
          moment(item.startTime)
            .hours(12)
            .minutes(0)
        )
      ) {
        return {
          ...acc,
          morning: [...acc.morning, item],
        }
      } else if (
        moment(item.startTime).isBefore(
          moment(item.startTime)
            .hours(17)
            .minutes(0)
        )
      ) {
        return {
          ...acc,
          afternoon: [...acc.afternoon, item],
        }
      }
      return {
        ...acc,
        evening: [...acc.evening, item],
      }
    },
    {
      morning: [],
      afternoon: [],
      evening: [],
    }
  )

const EventSchedule = props => {
  if (!props.schedule) return null

  const { morning, afternoon, evening } = splitIntoArray(props.schedule)
  return (
    <div>
      <h2>Schedule</h2>
      <EventScheduleItem title="Morning" data={morning} />
      <EventScheduleItem title="Afternoon" data={afternoon} />
      <EventScheduleItem title="Evening" data={evening} />
    </div>
  )
}

EventSchedule.propTypes = {
  schedule: PropTypes.array,
}

EventSchedule.defaultProps = {
  schedule: [],
}

export default EventSchedule

export const query = graphql`
  fragment eventScheduleFragment on ContentfulPerformance {
    id
    title
    startTime
  }
`
