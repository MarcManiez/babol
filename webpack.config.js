const path = require('path')
const nodeExternals = require('webpack-node-externals')

const nodeEnv = (process.env.NODE_ENV || 'development')
const isProduction = (nodeEnv === 'production')

module.exports = {
  devtool: 'inline-source-map',
  entry: './app/server.ts',
  externals: [nodeExternals()],
  mode: isProduction ? 'production' : 'development',
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
};
