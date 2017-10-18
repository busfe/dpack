'use strict'

const getCommonConfig = require('../config/CommonConfig')
const webpack = require('webpack')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const log = console.log

module.exports = function compile (args) {
	const commonConfig = getCommonConfig(args)
	let config = commonConfig
	const customConfigPath = path.resolve(process.cwd(), 'dpack.config.js')


	// get loaders
	const loaders = require('../loader')(args)
	config.module.rules = config.module.rules.concat(loaders)
	// get plugins
	const plugins = require('../plugin')(args)
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
	
	return webpack(config)
}
