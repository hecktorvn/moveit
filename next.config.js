const withReactSvg = require('next-react-svg')
const path = require('path')

module.exports = withReactSvg({
  include: path.resolve(__dirname, 'public/icons/'),
  webpack(config, options) {
    return config
  },
  serverRuntimeConfig: {
      PROJECT_ROOT: __dirname
  }
})