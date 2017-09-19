const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const path = require('path')

module.exports = function(compiler) {
	const app = express()

	app.use(webpackDevMiddleware(compiler, {
	  publicPath: path.resolve(process.cwd(), '/')
	}))

	app.listen(3000, function () {
	  console.log('listening on port 3000!\n');
	})
}