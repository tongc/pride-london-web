module.exports = require('./events')

export const query = graphql`
  query IndexPageQuery {
    site {
      siteMetadata {
        appleAppId
      }
    }
  }
`
