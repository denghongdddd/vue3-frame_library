const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const glob = require('glob');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const libMode = process.env.LIBMODE
const isCore = libMode === 'core'
let externals = [
  {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
    },
  },
]

externals.push(
  {//忽略插件
    // '@popperjs/core': '@popperjs/core',
    // 'async-validator': 'async-validator',
    // 'mitt': 'mitt',
    // 'normalize-wheel': 'normalize-wheel',
    // 'resize-observer-polyfill': 'resize-observer-polyfill',
    "axios":"axios",
    "gsap":"gsap",
  },
  function(content,req,callback){
    if(/^black-knight/.test(req)){
      callback(null, "black-kinght/lib/"+req.replace(/^black-knight\//,''))
    }else callback()
  },
  /^black-knight\//,
  // /^lodash.*/
)

const config = {
  mode: 'production',
  entry: Object.fromEntries( glob.sync("./Dpackages/**/*.js").map(v=>[v.slice(12,-3),v] ) ),
  output: {
    path: path.resolve(__dirname, '../lib'),
    publicPath: '/',
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'ElementPlus',
    umdNamedDefine: true,
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias:{
      // "@package": path.resolve(__dirname,"..","packages"),
      "black-knight": path.resolve(__dirname, '..','Dpackages'),
    },
  },
  externals,
  plugins: [
    new VueLoaderPlugin(),
  ],
}

/**打包css样式 */
const cssRule = {
  test: /\.(sass|scss|css)$/,
  use: [
    'css-loader',
    {
      loader: 'sass-loader',
      options: {
        implementation: require('sass'),
      },
    },
  ],
}
// if (isProd) {
config.plugins.push(
  // new MiniCssExtractPlugin({//导出css样式
  //   filename: '[name].[contenthash].css',
  //   chunkFilename: '[id].[contenthash].css',
  // }),
  new webpack.DefinePlugin({
    __VUE_OPTIONS_API__: JSON.stringify(true),
    __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
  }),
)
// cssRule.use.unshift(MiniCssExtractPlugin.loader)
// } else {
cssRule.use.unshift('style-loader')
// }
config.module.rules.push(cssRule)

module.exports = config
