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
    background: './src/background/index.ts',
    contentscript: './src/contentscript/index.ts',
  },
  output: {
    path: resolve('app'),
    filename: '[name].js',
  },
  plugins: [
    new ExtensionReloader({
      manifest: resolve('src/manifest.json'),
      port: 9090,
      reloadPage: true,
      entries: {
        contentScript: 'contentscript',
        background: 'background',
        extensionPage: 'app',
      },
    }),
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
      excludeChunks: ['background', 'contentscript'],
      inject: true,
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(tsx?|jsx?)$/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/,
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
