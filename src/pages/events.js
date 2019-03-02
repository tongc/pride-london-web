import React, { Fragment, Component } from 'react'
import Helmet from 'react-helmet'
import FlipMove from 'react-flip-move'
import styled from 'styled-components'
import { media } from '../theme/media'
import theme from '../theme/theme'
import { EventListingCard } from '../components/events'
import EventsFilters from '../components/events/eventsFilters'
import ImageBanner from '../components/imageBanner'
import Button from '../components/button'
import { Container, Row, Column } from '../components/grid'
import { Consumer } from '../components/appContext'
import { filterByLimit } from '../components/events/helpers'
import { dateFormat } from '../constants'
import filterIcon from '../theme/assets/images/icon-filters.svg'
import noScroll from 'no-scroll'
import moment from 'moment'

const FlexColumn = styled(Column)`
  display: block;

  ${media.tablet`
    display: flex;
  `};
`

const ColumnTextCenter = styled(Column)`
  text-align: center;
`
const StyledFlipMove = styled(FlipMove)`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 100%;
`

const CardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: 100%;
`

const ContainerAddFilters = styled(Container)`
  padding: 20px 0;
  margin-bottom: 20px;
  background-color: ${theme.colors.white};

  ${media.tablet`
    display: none;
  `};
`

const ColumnPagination = styled(Column)`
  text-align: center;
  padding-bottom: 20px;

  ${media.tablet`
    padding-top: 50px;
    padding-bottom: 60px;
  `};
`

const OffsetContainer = styled(Container)`
  ${media.tablet`
    margin-top: -50px;
    position: relative;
    z-index: 1;
  `};
`

const EventCount = styled.p`
  font-size: 0.875rem;
  line-height: 1.214;
  color: ${theme.colors.darkGrey};
`

const DateGroupHeading = styled.h2`
  margin: 1rem 0;

  ${media.tablet`
    display: none;
  `};
`

const FilterIcon = styled.img`
  margin: 0 6px -2px 0;
`

class Events extends Component {
  state = {
    showFiltersMobile: false,
  }

  toggleFiltersMobile = () => {
    this.setState(
      prevState => ({
        ...prevState,
        showFiltersMobile: !prevState.showFiltersMobile,
      }),
      () => noScroll.toggle()
    )
  }

  renderCard = (event, index, events) => {
    let header
    const longDayOfMonth = 'dddd D MMM'

    if (index === 0) {
      header = moment(event.node.startTime).format(longDayOfMonth)
    } else {
      const startDate = moment(event.node.startTime).format(dateFormat)
      const prevStartDate = moment(events[index - 1].node.startTime).format(
        dateFormat
      )

      if (startDate !== prevStartDate) {
        header = moment(event.node.startTime).format(longDayOfMonth)
      }
    }

    return (
      <FlexColumn
        width={[
          1, // 100% between 0px screen width and first breakpoint (375px)
          1, // 100% between first breakpoint(375px) and second breakpoint (768px)
          1 / 2, // 50% between second breakpoint(768px) and third breakpoint (1024px)
          1 / 3, // 33% between third breakpoint(1280px) and fourth breakpoint (1440px)
        ]}
        key={event.node.id}
      >
        {header && <DateGroupHeading>{header}</DateGroupHeading>}
        <EventListingCard event={event.node} />
      </FlexColumn>
    )
  }

  renderEventCount = (filteredCount, eventsToShow) => {
    let text

    if (filteredCount) {
      text = `You're viewing ${
        eventsToShow <= filteredCount ? eventsToShow : filteredCount
      } of ${filteredCount} events`
    } else {
      text = `There are no events matching your criteria. Please try changing your filter options.`
    }

    return <EventCount>{text}</EventCount>
  }

  isMobile() {
    return typeof window !== 'undefined' && window.innerWidth < 1024
  }

  renderEventCards(context) {
    const cards = context.filteredEvents
      .filter(filterByLimit, context.state.eventsToShow)
      .map((event, index, events) => this.renderCard(event, index, events))

    if (this.isMobile()) {
      return cards
    }

    // only use flip-move for the top few rows, so you get the
    // transtions when applying filters but not when loading more
    return (
      <CardWrapper>
        <StyledFlipMove>{cards.slice(0, 12)}</StyledFlipMove>
        {cards.slice(12)}
      </CardWrapper>
    )
  }

  render() {
    return (
      <Consumer>
        {context => (
          <Fragment>
            <Helmet
              meta={[
                {
                  name: 'apple-itunes-app',
                  content: `app-id=${
                    this.props.data.site.siteMetadata.appleAppId
                  }`,
                },
              ]}
            />
            <ImageBanner
              titleText="What's on"
              subtitleText="Check out the huge array of events that Pride are running during the festival"
              imageSrc=""
              altText=""
              color={theme.colors.beachBlue}
            />
            <OffsetContainer>
              <EventsFilters
                showFiltersMobile={this.state.showFiltersMobile}
                toggleFiltersMobile={this.toggleFiltersMobile}
              />
            </OffsetContainer>
            <ContainerAddFilters>
              <Row>
                <ColumnTextCenter width={1}>
                  <Button
                    aria-controls="filters"
                    aria-expanded={this.state.showFiltersMobile}
                    onClick={this.toggleFiltersMobile}
                    primary
                    fullmobile
                  >
                    <FilterIcon
                      src={filterIcon}
                      width="22"
                      height="18"
                      alt="Filters Icon"
                      role="presentation"
                    />{' '}
                    {context.filteredEvents.length < context.state.events.length
                      ? 'Edit Filters'
                      : 'Add Filters'}
                  </Button>
                </ColumnTextCenter>
              </Row>
            </ContainerAddFilters>
            <Container>
              <Row>
                {this.renderEventCards(context)}
                <ColumnPagination width={1}>
                  {this.renderEventCount(
                    context.filteredEvents.length,
                    context.state.eventsToShow
                  )}
                  {context.state.eventsToShow <
                    context.filteredEvents.length && (
                    <Button
                      onClick={() =>
                        context.actions.showMore(context.filteredEvents.length)
                      }
                      primary
                      disabled={
                        context.state.eventsToShow >=
                        context.filteredEvents.length
                      }
                      fullmobile
                    >
                      Show more events
                    </Button>
                  )}
                </ColumnPagination>
              </Row>
            </Container>
          </Fragment>
        )}
      </Consumer>
    )
  }
}

export default Events

export const query = graphql`
  query EventsPageQuery {
    site {
      siteMetadata {
        appleAppId
      }
    }
  }
`
