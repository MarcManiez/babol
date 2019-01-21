const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')

/**
 * Babol creates two bundles: one for typescript code run in node, and one for
 * templates containing typescript code, CSS, and other assets destined for the
 * browser.
 *
 * Babol also has two webpack configuration files: one run in development, and
 * another in production.
 *
 * This configuration file contains the options common to *ALL* bundles:
 * server, templates, whether in production or development.
 */

const commonOptions = {
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
    filename: '[name]-bundle.js'
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
}

const commonServerOptions = {
  entry: {
    server: './app/server.ts',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  externals: [nodeExternals()],
  target: 'node',
}

const commonTemplatesOptions = {
  entry: {
    templates: './app/views/client/index.ts',
  },
  output: {
    path: path.resolve(__dirname, 'public'),
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
}

module.exports = {
  commonOptions,
  commonServerOptions,
  commonTemplatesOptions,
}
