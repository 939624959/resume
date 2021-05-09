const {resolve} = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
process.env.NODE_ENV = 'production'
const commonCssLoader = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
    }
  },
  'css-loader',
  {
    loader: 'postcss-loader',
    // options: {
    //   ident: 'postcss',
    //   plugins: ()=>[require('postcss-preset-env')()]
    // }
  }
]
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: "js/built[contenthash:10].js",
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        enforce: "pre",
        loader: 'eslint-loader',
        options: {fix: true}
      },
      {
        oneOf: [
          {
            test: /\.less$/,
            use: [...commonCssLoader, 'less-loader']
          },
          {
            test: /\.css$/,
            use: [...commonCssLoader]
          },
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    corejs: {version: 3},
                    targets: {
                      chrome: '60',
                      firefox: '50',
                      ie: '9',
                      safari: '10',
                      edge: '17'
                    }
                  }
                ]
              ]
            }
          },
          {
            test: /\.(jpg|png|gif|jpeg)$/,
            loader: 'url-loader',
            options: {
              // limit: 8*1024,
              name: '[hash10].[ext]',
              esModule: false,
              outputPath: 'img'
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
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built[contenthash:10].css'
    }),
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    })
  ],
  mode: "production",
  devtool: "source-map"
}
