const fs = require('fs')
const path = require('path')
const proxys = {}

let proxyFiles = fs.readdirSync(__dirname)
let fileReg = /^([\S]+)\.js$/i
proxyFiles.forEach((file) => {
  let matchs = fileReg.exec(file)
  if (matchs && matchs.index > -1) {
    let _key = '/' + matchs[1]
    if (file !== 'index.js') {
      proxys[_key] = require(path.join(__dirname, file))
    }
  }
})

module.exports = proxys