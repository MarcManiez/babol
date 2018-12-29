const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const nodeExternals = require('webpack-node-externals')

const nodeEnv = (process.env.NODE_ENV || 'development')
const isProduction = (nodeEnv === 'production')
const mode = isProduction ? 'production' : 'development'

module.exports = [
  {
    devtool: 'inline-source-map',
    entry: {
      server: './app/server.ts'
    },
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
      filename: '[name]-bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    resolve: {
      extensions: [ '.ts', '.js' ]
    },
    target: 'node',
  },
  {
    entry: {
      client: './views/client-app.js',
    },
    mode,
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
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
        {
          test: /\.(gif|jpg|png|svg|eot|woff)$/,
          use: {
            loader: 'file-loader',
          },
        },
      ]
    },
    output: {
      filename: '[name]-bundle.js',
      path: path.resolve('dist'),
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name]-bundle.css',
      }),
    ],
    resolve: {
      extensions: ['.js', '.scss', '.ts' ],
    },
  }
]

