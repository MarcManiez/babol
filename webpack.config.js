const glob = require("glob")
const path = require('path')
const nodeExternals = require('webpack-node-externals')

const nodeEnv = (process.env.NODE_ENV || 'development')
const isProduction = (nodeEnv === 'production')
const mode = isProduction ? 'production' : 'development'

module.exports = [
  {
    devtool: 'inline-source-map',
    entry: './app/server.ts',
    externals: [nodeExternals()],
    mode,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    output: {
      filename: 'server-bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: [ '.ts', '.js' ]
    },
    target: 'node',
  },
  {
    entry: glob.sync('./views/*.scss'),
    output: {
      filename: 'bundle.min.css',
      path: path.resolve(__dirname, 'dist')
    },
    mode,
    module: {
      rules: [
        {
          test: /\.(css|scss)$/,
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ]
        },
      ],
    },
  },
]

