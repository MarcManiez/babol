const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const merge = require('webpack-merge')

const {
  commonOptions,
  commonServerOptions,
  commonTemplatesOptions,
} = require('./webpack.common')

/**
 * Takes the common rules and merges them with production-specific options to
 * create the webpack configuration file which is run in production.
 *
 * NB: this file returns two configuration objects; one for the server code and
 * another for the templates.
 */

const commonProductionOptions = merge(
  {
    mode: 'production',
  },
  commonOptions,
)

const productionServerConfiguration = merge(commonServerOptions, {
  optimization: {
    minimize: false,
  },
})
const productionTemplatesConfiguration = merge(commonTemplatesOptions, {
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
})

module.exports = [
  merge(commonProductionOptions, productionServerConfiguration),
  merge(commonProductionOptions, productionTemplatesConfiguration),
]
