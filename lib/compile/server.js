const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const _ = require('lodash')
const log = console.log

module.exports = function(compiler) {
	const app = express()

	app.use(webpackDevMiddleware(compiler, {
	  hot: true,
	  publicPath: path.resolve(process.cwd(), '/'),
	  stats: {
	  	colors: true
	  }
	}))

	app.use(webpackHotMiddleware(compiler, {
		log: console.log,
	  path: '/__webpack_hmr',
	  heartbeat: 10 * 1000,
	}))
	
	/**
	 * local server data mock or http proxy
	**/
	 
	if (fs.existsSync(path.resolve(process.cwd(), 'proxy.js'))) {
		const proxy = require('http-proxy-middleware')
		const configs = require(path.resolve(process.cwd(), 'proxy.js'))
		const Mock = require('mockjs')

		_.forEach(configs, (value, path) => {
			// if has mock property, use mockjs first
			if (value.useMock) {
				app.use(path, (req, res, next)  => {
					res.send(Mock.mock(value.mock))
					next()
				})
			} else {
				app.use(path, proxy(value.proxy))
			}
		})
	}
	app.listen(3000, function () {
	  console.log('listening on port 3000!\n');
	})
}