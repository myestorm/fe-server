module.exports = {
  publicPath: '/',
  lintOnSave: true,
  outputDir: './dist',
  productionSourceMap: !(process.env.NODE_ENV === 'production'),
  devServer: {
    port: 8080,
    proxy: {
      '/openplatform': {
        target: 'http://127.0.0.1:80',
        ws: true,
        changeOrigin: true
      }
    } // 配置开发环境 URL 便于本地开发调试
  }
}