import React, { Fragment } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import theme from '../theme/theme'
import BannerImage from '../components/banner/bannerImage'
import Button from '../components/button'
import eventsBgLeft from '../theme/assets/images/featured-events-bg-left.png'
import eventsBgRight from '../theme/assets/images/featured-events-bg-right.png'
import FeaturedEventsQuery from '../features/homepage/components/featuredEvents/featuredEventsQuery'
import { media } from '../theme/media'
import { Container, Row, Column } from '../components/grid'
import VolunteerBoxInfo from '../features/homepage/components/volunteerBoxInfo'
import BannerImg from '../theme/assets/images/banners/home/bg@3x.jpg'
import LatestNewsContainer from '../features/homepage/containers/latestNewsContainer'
import AnnouncementsContainer from '../features/homepage/containers/announcementsContainer'
import DonateContainer from '../features/homepage/containers/donateContainer'

//` (back-tick, the key below ESC key) is called "Template string", which is responsbile of making a string but allowing variables/interpolation i.e. ${myvariable}
//(reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

//styled is a javascript libaray (https://www.styled-components.com/) for constructing CSS and styled.div is a function
//(reference: https://www.styled-components.com/docs/advanced#theming)

//Here, an advanced form of template string called "Tagged templates" is used where the content between back-ticks are passed to styled.div function
//(reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#Tagged_templates)

//in this case styled.div is taking below `...` as input parameter
const FeaturedEventsContainer = styled.div`
  background-color: #282a80;
  width: 100%;
  position: relative;
  z-index: 1;
  padding: 30px 0;
  margin: 0 auto;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  ${media.tablet`
    padding: 58px 90px;
  `};
`

const FeaturedEventsHeader = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 0 20px;
  justify-content: space-between;

  ${media.tablet`
    padding-bottom: 9px;
  `};

  a {
    display: none;

    ${media.tablet`
      display: block;
    `};
  }
`

const ButtonMobile = styled.div`
  padding: 20px 20px 10px 20px;
  display: block;

  ${media.tablet`
    display: none;
  `};
`

const FeaturedEventsTitle = styled.div`
  h2 {
    font-size: 26px;
    line-height: 32px;
    font-weight: bold;
    margin: 0;
    color: ${theme.colors.white};

    ${media.tablet`
      font-size: 36px;
      line-height: 38px;
    `};
  }

  p {
    font-size: 16px;
    line-height: 1.38;
    color: #ffffff;
    margin: 0 0 10px;
    color: ${theme.colors.white};

    ${media.tablet`
      font-size: 18px;
      line-height: 1.44;
  `};
  }
`

const EventsBackgroundLeft = styled.div`
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;

  & img {
    max-height: 100%;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`
const EventsBackgroundRight = styled.div`
  z-index: -1;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;

  & img {
    max-height: 100%;
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`

const StyledContainer = styled(Container)`
  ${media.tablet`
    margin-top: -100px;
  `};

  ${media.desktop`
    margin-top: -250px;
  `};

  ${media.desktopHD`
    margin-top: -320px;
  `};

  ${media.tabletMax`
      margin: 0;
  `};
`

const StyledRow = styled(Row)`
  ${media.tabletMax`
      margin: 0;
  `};
`

const StyledColumn = styled(Column)`
  ${media.tabletMax`
      padding: 0;
  `};
`

const BannerButton = styled(Button)`
  margin-top: 1.5rem;
`

const StyledButton = styled(Button)`
  background-color: transparent;
  padding: 12px 28px;
`

//Arrow functions, just like normal functions, but doesn't give function a name
//in below case, if we rewrite it as normal functions it would be like
//const Home = function something(data) {
//  return (<Fragment>...</Fragment>)
//}

//And data is from Gatsby graphQl component. See HomePageQuery at the bottom of the page, 
//where the result of HomePageQuery is fed into data input parameter. 
//(reference: "The result of the query is automatically inserted into your React component on the data prop." from https://www.gatsbyjs.org/docs/querying-with-graphql/#what-does-a-graphql-query-look-like)

//As you can notice, inside HomePageQuery there are file and childImageSharp variables. 
const Home = ({
  data: {
    file: { childImageSharp },
  },
}) => {
  return (
    //React.Fragment
    //(reference: https://reactjs.org/docs/fragments.html)
    <Fragment>
      //see above import BannerImage from '../components/banner/bannerImage'
      <BannerImage
        titleText={'Pride in London'}
        subtitleText={
          'The UK’s biggest, most diverse Pride. A home for every part of London’s LGBT+ community.'
        }
        date={'2020 date to be announced'}
        imageSrc={BannerImg}
        color={theme.colors.eucalyptusGreen}
        large
        allowContentUnderflow
        videoId="348603446"
        //Here, this line can be written as
        //fixed={data.file.childImageSharp}
        //as well
        fixed={childImageSharp}
      >
        //refer to above const BannerButton = styled(Button)`
        <BannerButton
          wide={false}
          white
          primary
          to="https://donate.prideinlondon.org/"
        >
          Help keep Pride free
        </BannerButton>
      </BannerImage>
      //refer to above const StyledContainer = styled(Container)`
      <StyledContainer>
        <StyledRow>
          <StyledColumn width={1}>
            <FeaturedEventsContainer>
              <EventsBackgroundLeft>
                <img alt="backgroundEventsLeft" src={eventsBgLeft} />
              </EventsBackgroundLeft>
              <EventsBackgroundRight>
                <img alt="backgroundEvents" src={eventsBgRight} />
              </EventsBackgroundRight>
              <FeaturedEventsHeader>
                <FeaturedEventsTitle>
                  <h2>Featured events</h2>
                  <p>View events from across the LGBT+ community.</p>
                </FeaturedEventsTitle>
                <StyledButton wide={false} to="/events">
                  View all events
                </StyledButton>
              </FeaturedEventsHeader>
              <FeaturedEventsQuery />
              <ButtonMobile>
                <Button
                  isTabletHidden
                  secondary
                  small
                  wide={false}
                  link
                  to="/events/"
                >
                  View all events
                </Button>
              </ButtonMobile>
            </FeaturedEventsContainer>
          </StyledColumn>
        </StyledRow>
      </StyledContainer>
      <AnnouncementsContainer />
      <DonateContainer />
      <LatestNewsContainer />
      <VolunteerBoxInfo />
    </Fragment>
  )
}

Home.propTypes = {
  data: PropTypes.object.isRequired,
}

export default Home

export const HomePageQuery = graphql`
  query HomePageQuery {
    file(relativePath: { regex: "/video-poster/" }) {
      size
      name
      childImageSharp {
        desktop: fixed(width: 1600, quality: 100) {
          ...GatsbyImageSharpFixed_withWebp
        }
        tablet: fixed(width: 800, quality: 100) {
          ...GatsbyImageSharpFixed_withWebp
        }
        mobile: fixed(width: 400, quality: 100) {
          ...GatsbyImageSharpFixed_withWebp
        }
      }
    }
  }
`
