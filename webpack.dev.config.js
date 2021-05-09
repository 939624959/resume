const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: "js/built.js",
    path: resolve(__dirname, 'build'),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        loader: 'url-loader',
        options: {
          // limit: 8*1024,
          name: '[hash10].[ext]',
          esModule: false,
          outputPath: resolve(__dirname, 'img')
        }
      },
      {
        test: /\.html$/,
        loader: 'html-withimg-loader'
      },
      {
        exclude: /\.(html|js|css|less|jpg|png|gif|jpeg)/,
        loader: 'file-loader',
        options: {
          name: "[hash10].[ext]",
          outputPath: 'media'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  mode: "development",
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    open: true
  }
}
