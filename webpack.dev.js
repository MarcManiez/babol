const merge = require('webpack-merge')

const {
  commonOptions,
  commonServerOptions,
  commonTemplatesOptions,
} = require('./webpack.common')

/**
 * Takes the common rules and merges them with development-specific options to
 * create the webpack configuration file which is run in development.
 *
 * NB: this file returns two configuration objects; one for the server code and
 * another for the templates.
 */

const commonDevelopmentOptions = merge({
  devtool: 'inline-source-map',
  mode: 'development',
}, commonOptions)

const developmentServerConfiguration = commonServerOptions
const developmentTemplatesConfiguration = commonTemplatesOptions

module.exports = [
  merge(commonDevelopmentOptions, developmentServerConfiguration),
  merge(commonDevelopmentOptions, developmentTemplatesConfiguration),
]
