const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
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
    devtool: 'source-map',
    mode: 'production',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
      ],
    },
  },
  commonOptions,
)

const productionServerConfiguration = commonServerOptions
const productionTemplatesConfiguration = merge(commonTemplatesOptions, {
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
})

module.exports = [
  merge(commonProductionOptions, productionServerConfiguration),
  merge(commonProductionOptions, productionTemplatesConfiguration),
]
