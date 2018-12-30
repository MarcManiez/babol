require('dotenv').config()
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

const nodeEnv = process.env.NODE_ENV || 'development'
const isProduction = nodeEnv === 'production'
const mode = isProduction ? 'production' : 'development'

const serverAndTemplatesOptions = {
  devtool: 'inline-source-map',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
}

const serverConfiguration = merge(serverAndTemplatesOptions, {
  entry: {
    server: './app/server.ts',
  },
  externals: [nodeExternals()],
  target: 'node',
})

const templatesConfiguration = merge(serverAndTemplatesOptions, {
  entry: {
    client: './app/views/client-app.ts',
  },
  module: {
    rules: [
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
        ],
      },
      {
        test: /\.(gif|jpg|png|svg|eot|woff)$/,
        use: {
          loader: 'file-loader',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-bundle.css',
    }),
  ],
  resolve: {
    extensions: ['.scss'],
  },
})

module.exports = [serverConfiguration, templatesConfiguration]
