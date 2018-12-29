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
    mode,
    entry: {
      client: './views/client-app.js',
    },

    output: {
      filename: '[name]-bundle.js',
      path: path.resolve('dist'),
    },

    resolve: {
      extensions: ['.js', '.scss', '.ts' ],
    },

    plugins: [
      new MiniCssExtractPlugin({
        filename: '[name]-bundle.css',
      }),
    ],

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
                includePaths: ['./app/lib/styles'].map((d) => path.join(__dirname, d)),
              },
            },
          ]
        },
        {
          test: /\.(gif|jpg|png|svg|eot|woff)$/,
          use: {
            loader: 'file-loader',
            options: {
              publicPath: (isProduction ? 'https://brandless-production-static.imgix.net/assets/' : '/assets/'),
            },
          },
        },
      ]
    },
  }
]

