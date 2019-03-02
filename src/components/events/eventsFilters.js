import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { rgba } from 'polished'
import { Flex, Box } from 'grid-styled'
import { media } from '../../theme/media'
import { Consumer } from '../../components/appContext'
import EventDateFilter from './filters/eventDateFilter'
import EventFreeFilter from './filters/eventFreeFilter'
import EventDropdownFilter from './filters/eventDropdownFilter'
import Button from '../button'
import iconClear from '../../theme/assets/images/icon-clear.svg'
import iconClose from '../../theme/assets/images/icon-close.svg'
import theme from '../../theme/theme'

const FilterWrapper = styled(Flex)`
  display: block;
  background-color: ${theme.colors.white};
  position: fixed;
  padding-top: 0;
  padding-bottom: 0px;
  width: 100%;
  height: 100%;
  overflow: auto;
  top: 0;
  left: 100%;
  visibility: hidden;
  transition: left 0.15s linear, visibility 0s 0.15s linear;
  z-index: 1;

  &.open {
    transition: left 0.15s linear, visibility 0s 0s linear;
    left: 0;
    visibility: visible;
  }

  ${media.tablet`
    display: flex;
    position: static;
    width: auto;
    height: auto;
    overflow: visible;
    padding-top: 20px;
    padding-bottom: 20px;
    visibility: visible;
  `};
`

const FlexColumn = styled(Box)`
  display: flex;
  padding: 0px;

  & > * {
    flex-basis: 100%;
  }

  ${media.tablet`
    padding: 10px;
  `};

  @media (min-width: 1300px) {
    width: 25%;
  }

  ${media.desktop`
    padding: 10px 15px;
  `};
`

const FilterHeader = styled(Box)`
  background-color: ${theme.colors.indigo};
  min-height: 90px;
  display: flex;
  align-items: center;
  position: relative;

  ${media.mobile`
    padding: 0px;
  `};

  ${media.tablet`
    background-color: transparent;
    height: auto;
    min-height: 0;
    padding: 10px;
  `};

  ${media.desktop`
    padding: 10px 15px;
  `};
`

const FilterHeaderInner = styled.div`
  padding: 0 10px;
  display: flex;
  flex-basis: 100%;
  justify-content: space-between;

  @media (min-width: ${theme.breakpoints[0]}) {
    padding: 20px;
  }

  @media (min-width: ${theme.breakpoints[1]}) {
    padding: 0;
  }
`

const Label = styled.span`
  color: ${theme.colors.white};
  font-family: ${theme.fonts.title};
  font-weight: 600;

  @media (min-width: ${theme.breakpoints[1]}) {
    color: ${theme.colors.indigo};
  }
`

const ClearButton = styled.button`
  border: none;
  font-size: 0.875rem;
  font-weight: 500;
  color: ${theme.colors.indigo};
  padding: 10px 0 10px 25px;
  position: absolute;
  right: 10px;
  top: 95px;
  z-index: 1;
  background-color: transparent;
  cursor: pointer;
  overflow: hidden;

  ${media.mobile`
    right: 20px;
  `};

  ${media.tablet`
    position: relative;
    top: auto;
    right: auto;
  `};
`

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
`

const IconClear = styled.i`
  display: inline-block;
  width: 20px;
  height: 20px;
  transition: transform 0.3s linear;
  transform-origin: center center;
  position: absolute;
  left: 0;
  top: 8px;
  animation: ${props =>
    props.clickAnimation ? `${spin} 0.3s ease-in-out` : 'unset'};

  &:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    background-image: url(${iconClear});
    background-repeat: no-repeat;
    background-position: left center;
    width: 20px;
    height: 20px;
  }
`

const CloseButton = styled.button`
  display: inline-block;
  height: 20px;
  width: 20px;
  background-image: url(${iconClose});
  background-repeat: no-repeat;
  background-position: center center;
  background-color: transparent;
  border: none;
  cursor: pointer;

  ${media.tablet`
    display: none;
  `};
`

const ButtonWrapper = styled.div`
  display: block;
  padding: 20px;
  background-color: ${theme.colors.white};
  position: fixed;
  bottom: 0;
  left: 100%;
  transition: left 0.15s linear;
  width: 100%;
  box-shadow: 0 -3px 5px 0 ${rgba(theme.colors.black, 0.1)};

  &.open {
    left: 0;
  }

  ${media.tablet`
    display: none;
  `};
`

class EventsFilters extends Component {
  state = {
    clickAnimation: false,
  }

  animateIcon = () => {
    this.setState({ clickAnimation: true }, () => {
      setTimeout(() => {
        this.setState({ clickAnimation: false })
      }, 300)
    })
  }

  render() {
    return (
      <Consumer>
        {context => (
          <FilterWrapper
            className={this.props.showFiltersMobile && 'open'}
            mx={[
              0, // btwn 0 and first breakpoint (375px)
              0, // btwn 1st breakpoint(375px) and 2nd breakpoint (768px)
              25, // btwn 2nd breakpoint(768px) and 3rd breakpoint (1024px)
              60, // 3rd breakpoint(1024px) onwards
            ]}
            mb={[0, 0, 50]}
            px={[0, 0, 15, 15]}
            py={4}
            flexWrap="wrap"
            id="filters"
          >
            <FilterHeader width={1}>
              <FilterHeaderInner>
                <Label>Filter events by</Label>
                <ClearButton
                  type="button"
                  onClick={() => {
                    context.actions.clearFilters()
                    this.animateIcon()
                  }}
                >
                  <IconClear clickAnimation={this.state.clickAnimation} />
                  Clear filters
                </ClearButton>
                <CloseButton
                  aria-controls="filters"
                  aria-expanded={this.props.showFiltersMobile}
                  aria-label="Close filters"
                  onClick={this.props.toggleFiltersMobile}
                />
              </FilterHeaderInner>
            </FilterHeader>
            <FlexColumn width={[1, 1, 0.5, 0.3333]}>
              <EventDropdownFilter
                heading="Category"
                filterName="eventCategories"
                filterOpen={context.state.filterOpen}
                closeSiblingFilters={context.actions.closeSiblingFilters}
              />
            </FlexColumn>
            <FlexColumn width={[1, 1, 0.5, 0.3333]}>
              <EventDateFilter />
            </FlexColumn>
            <FlexColumn width={[1, 1, 0.5, 0.3333]}>
              <EventDropdownFilter
                heading="Area of London"
                filterName="area"
                filterOpen={context.state.filterOpen}
                closeSiblingFilters={context.actions.closeSiblingFilters}
              />
            </FlexColumn>
            <FlexColumn width={[1, 1, 0.5, 0.3333]}>
              <EventDropdownFilter
                heading="Time of day"
                filterName="timeOfDay"
                filterOpen={context.state.filterOpen}
                closeSiblingFilters={context.actions.closeSiblingFilters}
              />
            </FlexColumn>
            <FlexColumn width={[1, 1, 0.5, 0.3333]}>
              <EventDropdownFilter
                heading="Age group"
                filterName="audience"
                filterOpen={context.state.filterOpen}
                closeSiblingFilters={context.actions.closeSiblingFilters}
              />
            </FlexColumn>
            <FlexColumn width={[1, 1, 0.5, 0.3333]}>
              <EventDropdownFilter
                heading="Venue options"
                filterName="venueDetails"
                filterOpen={context.state.filterOpen}
                closeSiblingFilters={context.actions.closeSiblingFilters}
              />
            </FlexColumn>
            <FlexColumn width={[1, 1, 0.5, 0.3333]}>
              <EventDropdownFilter
                heading="Accessibility"
                filterName="accessibilityOptions"
                filterOpen={context.state.filterOpen}
                closeSiblingFilters={context.actions.closeSiblingFilters}
              />
            </FlexColumn>
            <FlexColumn width={[1, 1, 0.5, 0.3333]}>
              <EventFreeFilter />
            </FlexColumn>
            <ButtonWrapper className={this.props.showFiltersMobile && 'open'}>
              <Button
                primary
                fullmobile
                onClick={this.props.toggleFiltersMobile}
              >
                Show {context.filteredEvents.length} events
              </Button>
            </ButtonWrapper>
          </FilterWrapper>
        )}
      </Consumer>
    )
  }
}

EventsFilters.propTypes = {
  showFiltersMobile: PropTypes.bool.isRequired,
  toggleFiltersMobile: PropTypes.func.isRequired,
}

export default EventsFilters
