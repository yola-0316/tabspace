const path = require('path')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtensionReloader = require('webpack-extension-reloader')

const resolve = (...paths) => path.join(__dirname, ...paths)
const mode = process.env.NODE_ENV || 'development'

module.exports = {
  mode,
  devtool: 'cheap-module-source-map',
  entry: {
    app: './src/app/index.tsx',
    // background: './src/background/index.js',
    // contentscript: './src/contentscript/index.js',
  },
  output: {
    path: resolve('app'),
    filename: '[name].js',
  },
  plugins: [
    new ExtensionReloader(),
    new webpack.DefinePlugin({
      DEBUG: mode === 'development',
      PRODUCTION: mode !== 'development',
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/manifest.json', to: 'manifest.json' },
        // { from: 'src/assets/icons', to: 'assets/icons' },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/app/index.html',
      excludeChunks: ['background', 'content', 'exchanger'],
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.tsx$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    alias: {
      '@': resolve('src'),
    },
  },
}
