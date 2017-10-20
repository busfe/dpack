const express = require('express')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const path = require('path')
const fs = require('fs')
const chalk = require('chalk')
const _ = require('lodash')
const opn = require('opn')
const log = console.log

module.exports = function(args) {
	args.env = args.env || 'dev'
	const compiler = require('../compile')(args)
	// watch file change an re-compile
	if (args.watch) {
		compiler.watch({

		}, (err, stats) => {
			if (err && stats.hasErrors) {
				log(chalk.red(err))
			} else {
				log(chalk.green('compile succeed!'))
				log(chalk.yellow('watching files change'))
			}
		})
	}
	const app = express()

	const devMiddleware = webpackDevMiddleware(compiler, {
	  hot: true,
	  publicPath: path.resolve(process.cwd(), '/'),
	  stats: {
	  	colors: true
	  }
	})
	app.use(devMiddleware)

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
	const port = args.port || 3000

	devMiddleware.waitUntilValid(() => {
		console.log(`listening on port ${port}!\n`);
		opn(`http://localhost:${port}`)
	})
	app.listen(port)
}