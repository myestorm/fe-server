const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const glob = require('glob')
const path = require('path')

const proxys = require('./proxys/index')

// 统一配置多页
const pages = {}
glob.sync('./src/pages/**/*.json').forEach((filePath) => {
  let content = require(filePath)
  let chunk = content.fileName || path.parse(filePath).name
  let title = content.title || ''
  let entry = content.entry || filePath.replace(/\.json$/, '.js')
  let template = content.template || 'public/index.html'

  pages[chunk] = {
    entry,
    title,
    template,
    chunks: ['chunk-vendors', 'chunk-common', chunk]
  }
})
console.log('process.env.NODE_ENV == ' + process.env.NODE_ENV)

module.exports = {
  publicPath: '/',
  pages,
  lintOnSave: true,
  outputDir: './dist',
  productionSourceMap: !(process.env.NODE_ENV === 'production'),
  devServer: {
    port: 8080,
    proxy: proxys // 配置开发环境 URL 便于本地开发调试
  },
  chainWebpack: (config) => {
    config.plugins.delete('named-chunks')
    config.externals({
      'CKEDITOR': 'window.CKEDITOR'
    })
  },
  configureWebpack: (config) => {
    const plugins = [
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: {
            drop_console: true
          }
        },
        sourceMap: true
      })
    ]
    // splitChunk 配置
    const splitChunksConfig = {
      cacheGroups: {
        vendors: {
          name: 'chunk-vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          chunks: 'initial',
          minChunks: 2
        },
        common: {
          name: 'chunk-common',
          minChunks: 2,
          priority: -20,
          chunks: 'initial',
          reuseExistingChunk: true
        }
      }
    }
    if (process.env.NODE_ENV === 'production') {
      config.plugins = [...config.plugins, ...plugins]
      config.optimization.splitChunks = splitChunksConfig
    }
  }
}
