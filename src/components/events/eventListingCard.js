import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import styled from 'styled-components'
import { formatDate, formatPrice } from './helpers'
import { media } from '../../theme/media'
import theme from '../../theme/theme'

const Card = styled(Link)`
  display: block;
  border-radius: 5px;
  text-decoration: none;
  color: ${theme.colors.black};
  overflow: hidden;
  display: flex;
  position: relative;
  width: 100%;
  min-height: 130px;
  background-color: ${theme.colors.white};

  transform: ${props => (props.mounted == 'true' ? 'scale(1)' : 'scale(0.2)')};
  opacity: ${props => (props.mounted == 'true' ? 1 : 0)};
  transition: transform 0.2s ease-out, opacity 0.15s ease-out;

  &:hover,
  &:focus {
    .card-img-wrapper {
      transform: scale(1.08);
    }
  }

  ${media.tablet`
    display: block;
    min-height: auto;
  `};

  ${media.desktop`
    margin-bottom: 10px;
  `};
`

const CardImageOverflow = styled.div`
  overflow: hidden;
  flex-basis: 40%;
  flex-shrink: 0;
  height: auto;
  position: relative;

  ${media.tablet`
    padding-top: 56.25%;
  `};
`

const CardImageWrapper = styled.div`
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  background-image: url(${props => props.src});
  transition: transform 0.15s ease-out;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`

const CardImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
`

const CardBody = styled.div`
  padding: 15px;
  background-color: ${theme.colors.white};
  flex-grow: 1;

  ${media.tablet`
    padding: 30px;
  `};
`

const CardDate = styled.span`
  display: block;
  color: ${theme.colors.darkGrey};
  font-size: 0.875rem;
  font-family: ${theme.fonts.body};
  line-height: 1.43;
  font-weight: 400;
  margin-bottom: 0.65rem;

  ${media.tablet`
    font-family: ${theme.fonts.title};
    font-weight: 600;
  `};
`

const CardBullet = styled.span`
  display: none;

  ${media.tablet`
    display: inline;
  `};
`

const CardDateSpan = styled.span`
  display: block;

  ${media.tablet`
    display: inline;
  `};
`

const CardPrice = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${theme.colors.indigo};
  color: ${theme.colors.white};
  font-family: ${theme.fonts.title};
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 0.75rem;

  ${media.tablet`
    font-size: 1rem;
  `};
`

const CardHeading = styled.h3`
  margin: 0;
  line-height: 1.25rem;
  font-size: 1rem;
  color: black;

  ${media.tablet`
    font-size: 1.5rem;
    line-height: 1.8125rem;
  `};
`

/* eslint-disable-next-line */
export class EventListingCard extends React.Component {
  state = {
    mounted: 'false',
  }

  componentDidMount() {
    this.setState({ mounted: 'true' })
  }
  shouldComponentUpdate(_nextProps, nextState) {
    return nextState.mounted !== this.state.mounted
  }
  render() {
    const { event } = this.props
    const { date, time } = formatDate(event)

    const imageUrl =
      event.eventsListPicture &&
      `${
        event.eventsListPicture.file.url
      }?fit=fill&w=400&h=225&f=faces&fm=jpg&q=75`

    return (
      <Card
        to={`/events/${event.id}`}
        itemScope
        itemType="http://schema.org/Event"
        mounted={`${this.state.mounted}`}
      >
        <CardImageOverflow>
          <CardImageWrapper className="card-img-wrapper" src={imageUrl}>
            <CardImage
              src={imageUrl}
              alt={event.eventsListPicture && event.eventsListPicture.title}
              width="400"
              height="225"
              itemProp="image"
              content={imageUrl}
            />
          </CardImageWrapper>
        </CardImageOverflow>

        <CardBody>
          <CardDate>
            <CardDateSpan>{date}</CardDateSpan>
            <CardBullet> • </CardBullet> <CardDateSpan>{time}</CardDateSpan>
            <meta itemProp="startDate" content={event.startTime} />
            {event.startTime !== event.endTime && (
              <meta itemProp="endDate" content={event.endTime} />
            )}
          </CardDate>
          <CardHeading itemProp="name">{event.name}</CardHeading>
        </CardBody>
        {event.eventPriceLow != null && (
          <CardPrice
            itemProp="offers"
            itemScope
            itemType="http://schema.org/Offer"
          >
            <span itemProp="price">
              {formatPrice(event.eventPriceLow, event.eventPriceHigh)}
            </span>
            <meta
              itemProp="isAccessibleForFree"
              content={`${event.eventPriceLow === 0 ? true : false}`}
            />
          </CardPrice>
        )}
      </Card>
    )
  }
}

EventListingCard.propTypes = {
  event: PropTypes.object.isRequired,
}

export default EventListingCard
