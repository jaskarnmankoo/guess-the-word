module.exports = {
  pathPrefix: '/guess-the-word',
  plugins: [
    'gatsby-plugin-csp',
    'gatsby-plugin-postcss',
    'gatsby-plugin-preact',
    'gatsby-plugin-react-helmet',
    { resolve: 'gatsby-plugin-html-attributes', options: { lang: 'en' } }
  ],
  siteMetadata: {
    title: 'Guess the Word',
    description: 'Single player version of Guess the Word',
    author: 'Jaskarn Mankoo'
  }
};
