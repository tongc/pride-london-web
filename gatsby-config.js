const env = process.env.NODE_ENV || 'development'
require('dotenv').config({ path: `./.env.${env}` })

module.exports = {
  siteMetadata: {
    name: 'Pride in London Events Listing',
    title:
      'Pride Festival 9 June - 7 July 2018 | Pride in London — Pride in London',
    description:
      "This June and July, enjoy events across the city culminating in London's iconic Pride parade and free Trafalgar Square performances on July 7th 2018.",
    url: 'https://' + (process.env.GATSBY_PUBLIC_DOMAIN || 'localhost'), // If changing this URL, ensure you remove trailing slash
    appleAppId: '1250496471',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-react-next',
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `${process.env.CONTENTFUL_EVENTS_ID ||
          process.env.CONTENTFUL_ID}`,
        accessToken: `${process.env.CONTENTFUL_EVENTS_TOKEN ||
          process.env.CONTENTFUL_TOKEN}`,
      },
    },
  ],
}
