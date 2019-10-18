module.exports = {
  target: 'https://www.estorm.cn/',
  changeOrigin: true,
  ws: true,
  pathRewrite: {
    '^/api': '/'
  }
}