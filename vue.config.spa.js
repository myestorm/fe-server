const proxys = require('./proxys/index')
module.exports = {
  publicPath: '/',
  lintOnSave: true,
  outputDir: './dist',
  productionSourceMap: !(process.env.NODE_ENV === 'production'),
  devServer: {
    port: 8080,
    proxy: proxys // 配置开发环境 URL 便于本地开发调试
  }
}