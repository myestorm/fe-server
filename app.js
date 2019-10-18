const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const proxy = require('http-proxy-middleware')
const fs = require('fs')

const proxys = require('./proxys/index')

const app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'dist')))

// router
let routeFiles = fs.readdirSync(path.join(__dirname, './routes/'))
let fileReg = /^([\S]+)\.js$/i
let routeList = {}
routeFiles.forEach((file) => {
  let matchs = fileReg.exec(file)
  if (matchs && matchs.index > -1) {
    let _key = matchs[1]
    let _path = ''
    routeList[_key] = require(path.join(__dirname, './routes', file))
    if (routeList[_key].cPath) {
      _path = routeList[_path].cPath
    } else {
      _path = _key
    }
    _path = _path === 'index' ? '' : _path
    app.use('/' + _path, routeList[_key])
  }
})

// proxys

for (let key in proxys) {
  app.use(key, proxy(proxys[key]))
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
