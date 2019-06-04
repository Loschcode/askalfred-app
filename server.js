// const express = require('express')
// const path = require('path')
// const serveStatic = require('serve-static')
// const history = require('connect-history-api-fallback')

// let app = express()
// app.use(serveStatic(__dirname + '/dist'))
// app.use(history())

// const port = process.env.PORT || 5000
// app.listen(port, () => {
//   console.log('Listening on port ' + port)
// })

// server.js
var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')
// added this middleware
var history = require('connect-history-api-fallback')

app = express()
// started middleware
app.use(history())

app.use(serveStatic(__dirname))
var port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)
