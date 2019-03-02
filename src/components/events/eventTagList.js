import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import theme from '../../theme/theme'

const { colors } = theme

export const getEventCategoryStyleFromName = category => {
  switch (category) {
    case 'Cabaret and Variety':
      return {
        backgroundColor: colors.tomato,
        color: 'white',
      }
    case 'Community':
      return {
        backgroundColor: colors.skyBlue,
        color: 'black',
      }
    case 'Talks and Debates':
      return {
        backgroundColor: colors.beachBlue,
        color: 'white',
      }
    case 'Film and Screenings':
      return {
        backgroundColor: colors.lightTeal,
        color: 'black',
      }
    case 'Plays and Theatre':
      return {
        backgroundColor: colors.pink,
        color: 'white',
      }
    case 'Social and Networking':
      return {
        backgroundColor: colors.bondiBlue,
        color: 'white',
      }
    case 'Nightlife':
      return {
        backgroundColor: colors.yellow,
        color: 'black',
      }
    case 'Exhibition and Tours':
      return {
        backgroundColor: colors.electricPurple,
        color: 'white',
      }
    case 'Sports and Activities':
      return {
        backgroundColor: colors.lemonGreen,
        color: 'black',
      }
    case 'Health':
      return {
        backgroundColor: colors.fuscia,
        color: 'black',
      }
    case 'Music':
      return {
        backgroundColor: colors.greyBlue,
        color: 'white',
      }
    default:
      return {
        backgroundColor: colors.greyBlue,
        color: 'white',
      }
  }
}

const EventTagListItem = styled.li`
  display: inline-block;
  border-radius: 4px;
  padding: 0px 6px;
  font-size: 14px;
  line-height: 22px;
  font-weight: 600;
  font-family: Poppins, sans-serif;
  margin: 0px 10px 6px 0;
`

const EventTagUl = styled.ul`
  padding: 0;
  margin: 0;
  margin-bottom: -6px;
  list-style-type: none;
`

const EventTagList = ({ values, className }) =>
  values ? (
    <EventTagUl className={className}>
      {values.map(value => (
        <EventTagListItem
          style={getEventCategoryStyleFromName(value)}
          key={value}
        >
          {value}
        </EventTagListItem>
      ))}
    </EventTagUl>
  ) : null

EventTagList.propTypes = {
  values: PropTypes.arrayOf(PropTypes.string).isRequired,
  className: PropTypes.string,
}

EventTagList.defaultProps = {
  className: null,
}

export default EventTagList
