const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const path = require('path')

module.exports = function(compiler) {
	const app = express()

	app.use(webpackDevMiddleware(compiler, {
	  hot: true,
	  publicPath: path.resolve(process.cwd(), '/')
	}))

	app.use(require("webpack-hot-middleware")(compiler, {
		log: console.log,
	  path: '/__webpack_hmr',
	  heartbeat: 10 * 1000,
	}))
	
	app.listen(3000, function () {
	  console.log('listening on port 3000!\n');
	})
}