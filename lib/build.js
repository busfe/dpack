'use strict'

const getCommonConfig = require('./config/CommonConfig')
const webpack = require('webpack')
const chalk = require('chalk')
const log = console.log

module.exports = function build (args, callback) {
	const commonConfig = getCommonConfig()

	let config = Object.assign({}, commonConfig)
	// get loaders
	const loaders = require('./loader')(args)

	// get plugins
	const plugins = require('./plugin')(args)
	config.plugins = config.plugins.concat(plugins)

	log(chalk.green('start compiling....'))
	const compiler = webpack(config)

	// watch file change an re-compile
	if (args.watch) {
		compiler.watch({

		}, (err, stats) => {
			if (err && stats.hasErrors) {
				log(chalk.red(err))
			} else {
				log(chalk.green('compile succed!'))
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
			log(chalk.green('compile success!'))
		}

	})

	if (args.port) {
		console.log(args.port)
	}
}
