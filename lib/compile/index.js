'use strict'

const getCommonConfig = require('../config/CommonConfig')
const webpack = require('webpack')
const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const _ = require('lodash')
const log = console.log

// 获取并格式化webpack的plugin配置项值
function formatPlugins(plugins, result) {
	_.forEach(plugins, function (n) {
		if (_.isArray(n)) {
			formatPlugins(n, result)
		} else if (_.isObject(n) && _.isFunction(n.apply)){ //webpack插件都带有apply方法
			result.push(n)
		}
	})
}
// convert innromal config into normal
function formatNormalWebpackCfg(config) {
	config.module.rules = _.toArray(config.module.rules)

	let plugins = []
	formatPlugins(config.plugins, plugins);
	
	config.plugins = plugins
}

module.exports = function compile (args) {
	const commonConfig = getCommonConfig(args)
	let config = commonConfig
	const customConfigPath = path.resolve(process.cwd(), args.config || 'dpack.config.js')

	// get loaders
	const loaders = require('../loader')(commonConfig, args)
	_.assign(config.module.rules, loaders)


	// get plugins
	const plugins = require('../plugin')(args)
	_.assign(config.plugins, plugins)


	log(chalk.green('start compiling....'))
	if (args.env === 'dev') {
		// add hot module middleware
		config.entry.push('webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000')
	}

	//  get user custom config to merge
	if (fs.existsSync(customConfigPath)) {
		const customConfig = require(customConfigPath)

		if (typeof customConfig !== 'function') {
			throw new Error(`Return of ${customConfigPath} must be a function.`);
		}

		config = customConfig(config)
		formatNormalWebpackCfg(config)

	}
	
	return webpack(config)
}
