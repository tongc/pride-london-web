import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import EventListingCard from './eventListingCard'
import ChevronRight from '../../components/chevronRight'
import { Consumer } from '../../components/appContext'
import { Container, Row, Column } from '../../components/grid'
import { media } from '../../theme/media'
import theme from '../../theme/theme'

const ViewAll = styled.a`
  color: ${theme.colors.indigo};
  font-family: ${theme.fonts.title};
  font-size: 1rem;
  padding-top: 5px;
  text-align: right;
  text-decoration: none;
`

const FlexColumn = styled(Column)`
  display: flex;
`

export const StyledContainer = styled(Container)`
  padding: 30px 0px;
  ${media.desktop`
    padding: 60px 0px;
  `}
  background-color: ${theme.colors.lightGrey};
`

const Heading = styled.h2`
  margin: 0;
`

const DesktopOnly = styled.span`
  display: none;
  ${media.desktop`
    display: inline;
  `};
`

const HeadingRow = styled(Row)`
  margin-bottom: 20px;
  /* add padding to match column padding */
  padding: 0px 10px;
  ${media.desktop`
    padding: 0px 15px;
  `};
  align-items: center;
  justify-content: space-between;
`

class EventsYouMayLike extends Component {
  componentDidMount() {}
  filterEventsYouMayLike = (filtered, events, eventId) => {
    const eventsYouMayLike = [...filtered, ...events]
    return eventsYouMayLike
      .filter((event, pos, arr) => {
        // Filter out recurrences of current event
        if (event.node.id.includes(eventId)) return false
        // Filter out duplicate events
        return (
          arr.map(mapEvent => mapEvent.node.id).indexOf(event.node.id) ===
            pos &&
          // Filter out past events
          moment(event.node.startTime).diff(moment(), 'hours') > 0
        )
      })
      .splice(0, 3) // Take first 3
  }

  render() {
    return (
      <Consumer>
        {context => {
          const eventsYouMayLike = this.filterEventsYouMayLike(
            context.filteredEvents,
            context.state.events,
            this.props.eventId
          )

          if (eventsYouMayLike.length === 0) return null

          return (
            <StyledContainer>
              <HeadingRow>
                <Heading>You may also like</Heading>
                <ViewAll href="/events">
                  View all<DesktopOnly>&nbsp;events</DesktopOnly>&nbsp;<ChevronRight />
                </ViewAll>
              </HeadingRow>
              <Row>
                {eventsYouMayLike.map(event => (
                  <FlexColumn width={[1, 1, 1 / 2, 1 / 3]} key={event.node.id}>
                    <EventListingCard event={event.node} />
                  </FlexColumn>
                ))}
              </Row>
            </StyledContainer>
          )
        }}
      </Consumer>
    )
  }
}

EventsYouMayLike.propTypes = {
  eventId: PropTypes.string.isRequired,
}

export default EventsYouMayLike
