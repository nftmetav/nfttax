var path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle/bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        loader: "style!css!"
      }
    ]
  },
  plugins: [
    // ...
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ]
  }
}
