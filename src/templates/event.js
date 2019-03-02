import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ReactMarkdown from 'react-markdown'
import Helmet from 'react-helmet'
import { media } from '../theme/media'
import theme from '../theme/theme'
import {
  EventTagList,
  EventsYouMayLike,
  EventInfoCard,
  EventDirectionsSection,
  EventSchedule,
} from '../components/events'

import { formatPrice } from '../components/events/helpers'

const PageWrapper = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: ${theme.breakpoints[3]};
  background-color: white;
`

const Title = styled.h1`
  color: ${theme.colors.indigo};
  font-size: 1.25em;
  line-height: 1.5;
  margin-bottom: 20px;
  ${media.desktop`
    font-size: 1.75em;
    line-height: 1.4;
  `};
`
const HeroImageAndTitle = styled.div`
  display: flex;
  flex-direction: column-reverse;
  ${media.desktop`
    flex-direction: column;
  `};
`

const ContentWrapper = styled.div`
  padding: 30px 20px;
  width: 100vw;
  ${media.tablet`
    padding: 30px 50px;
  `};
  ${media.desktop`
    padding: 0;
    margin-left: 90px;
    max-width: 40vw;
  `};
  ${media.desktopHD`
    max-width: 830px;
  `};
  a {
    color: #2d2f7f;
    border-bottom: 2px solid #2cda9d;
    text-decoration: none;
    font-weight: 500;
    letter-spacing: 0.6px;
    display: inline-block;
    transition: border-bottom-color 0.1s ease-in-out;
    line-height: 1.1em;
  }
  a:hover {
    border-bottom-color: transparent;
  }
`

const TitleWrapper = ContentWrapper.extend`
  ${media.desktop`
    padding: 60px 0px 50px;
  `};
`

const HeroImage = styled.div`
  background-size: cover;
  background-position: center center;
  background-image: url(${props => props.src});

  height: 240px;
  ${media.desktop`
    height: 480px;
  `};
`

const Section = styled.div`
  margin-bottom: 20px;
  ${media.desktop`
    margin-bottom: 60px;
  `};
`

const AccessibilityHeading = styled.h2`
  font-size: 1.125rem;
  line-height: 1.375rem;
  font-weight: 600;
  margin: 1.875rem 0 0.9375rem 0;
  ${media.tablet`
    font-size: 1.5rem;
    line-height: 1.8125rem;
    margin: 1.875rem 0;
  `};
`

// eslint-disable-next-line react/prefer-stateless-function
export default class Event extends Component {
  render() {
    const {
      id,
      individualEventPicture,
      eventDescription,
      name,
      eventCategories,
      accessibilityDetails,
      location,
      locationName,
      addressLine1,
      addressLine2,
      city,
      postcode,
      eventPriceLow,
      eventPriceHigh,
      performances,
    } = this.props.data.contentfulEvent

    const metaImg = `https:${individualEventPicture.file.url}?w=1000&h=562`
    const metaUrl =
      this.props.data.site.siteMetadata.url + this.props.location.pathname

    return (
      <PageWrapper>
        <Helmet
          title={name}
          meta={[
            // Schema meta tags
            {
              itemprop: 'name',
              content: name,
            },
            {
              itemprop: 'description',
              content: eventDescription.eventDescription,
            },
            {
              itemprop: 'url',
              content: metaUrl,
            },
            {
              itemprop: 'thumbnailUrl',
              content: metaImg,
            },
            {
              itemprop: 'image',
              content: metaImg,
            },
            {
              itemprop: 'startDate',
              content: this.props.pathContext.startTime,
            },
            {
              itemprop: 'endDate',
              content: this.props.pathContext.endTime,
            },
            {
              itemprop: 'isAccessibleForFree',
              content: eventPriceLow === 0 ? true : false,
            },
            {
              itemprop: 'offers',
              itemscope: true,
              itemtype: 'http://schema.org/Offer',
              itemref: 'meta-price',
            },
            {
              itemprop: 'price',
              id: 'meta-price',
              content: formatPrice(eventPriceLow, eventPriceHigh),
            },

            // OpenGraph Meta Tags
            {
              property: 'og:title',
              content: name,
            },
            {
              property: 'og:description',
              content: eventDescription.eventDescription,
            },
            {
              property: 'og:latitude',
              content: location.lat,
            },
            {
              property: 'og:longitude',
              content: location.lon,
            },
            {
              property: 'og:street-address',
              content: !addressLine1
                ? ''
                : addressLine2
                  ? `${locationName}, ${addressLine1}, ${addressLine2}`
                  : `${locationName}, ${addressLine1}`,
            },
            {
              property: 'og:locality',
              content: city && city,
            },
            {
              property: 'og:postal-code',
              content: postcode && postcode,
            },
            {
              property: 'og:url',
              content: metaUrl,
            },
            {
              property: 'og:image',
              content: metaImg,
            },
            {
              property: 'og:image:secure_url',
              content: metaImg,
            },

            // Twitter Meta Tags
            {
              name: 'twitter:title',
              content: name,
            },
            {
              name: 'twitter:description',
              content: eventDescription.eventDescription,
            },
            {
              name: 'twitter:image',
              content: metaImg,
            },
            {
              name: 'twitter:url',
              content: metaUrl,
            },
          ]}
          htmlAttributes={{
            itemtype: 'http://schema.org/Event',
          }}
          link={[
            {
              rel: 'canonical',
              href: metaUrl,
            },
          ]}
        />
        <HeroImageAndTitle>
          <HeroImage
            src={individualEventPicture.file.url}
            role="presentation"
          />
          <TitleWrapper>
            <Title>{name}</Title>
            <EventTagList values={eventCategories} />
          </TitleWrapper>
        </HeroImageAndTitle>
        <EventInfoCard
          data={this.props.data.contentfulEvent}
          pathContext={this.props.pathContext}
        />
        <ContentWrapper>
          <Section>
            <ReactMarkdown source={eventDescription.eventDescription} />
          </Section>
          {accessibilityDetails && (
            <React.Fragment>
              <AccessibilityHeading>Accessibility</AccessibilityHeading>
              <Section>
                <ReactMarkdown
                  source={accessibilityDetails.accessibilityDetails}
                />
              </Section>
            </React.Fragment>
          )}
          {performances && (
            <Section>
              <EventSchedule schedule={performances} />
            </Section>
          )}
        </ContentWrapper>
        <EventDirectionsSection data={this.props.data.contentfulEvent} />
        <EventsYouMayLike eventId={id} />
      </PageWrapper>
    )
  }
}

Event.propTypes = {
  data: PropTypes.object.isRequired,
  pathContext: PropTypes.object.isRequired,
}

export const eventPageQuery = graphql`
  query eventQuery($id: String!) {
    site {
      siteMetadata {
        name
        title
        description
        url
      }
    }

    contentfulEvent(id: { eq: $id }) {
      id
      name
      individualEventPicture {
        file {
          url
        }
        title
        description
      }
      performances {
        ...eventScheduleFragment
      }
      eventCategories
      eventDescription {
        eventDescription
      }
      accessibilityDetails {
        accessibilityDetails
      }
      ...eventDirectionsFragment
      ...eventInfoCardQuery
    }
  }
`
