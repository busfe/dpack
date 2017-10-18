'use strict'

const getCommonConfig = require('./config/CommonConfig')
const webpack = require('webpack')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const log = console.log

module.exports = function build (args, callback) {
	const commonConfig = getCommonConfig()
	let config = commonConfig
	const customConfigPath = path.resolve(process.cwd(), 'dpack.config.js')

	// get loaders
	const loaders = require('./loader')(args)
	config.module.rules = config.module.rules.concat(loaders)

	// get plugins
	const plugins = require('./plugin')(args)
	config.plugins = config.plugins.concat(plugins)

	log(chalk.green('start compiling....'))

	if (args.server) {
		// add hot module middleware
		config.entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000')
	}

	//  get user custom config to merge
	if (fs.existsSync(customConfigPath)) {
		const customConfig = require(customConfigPath)
		// Object.assign(config, customConfigPath)
		customConfig(config)
	}
	
	const compiler = webpack(config)

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
		return
	}

	// start webpack-dev-server
	if (args.server) {
		require('./compile/server')(compiler)
		return
	}

	compiler.run((err, stats) => {
		if (err && stats.hasErrors) {
			log(chalk.red(err))
		} else {
			log(chalk.green('compile succeed!'))
		}

	})

	if (args.port) {
		console.log(args.port)
	}
}
