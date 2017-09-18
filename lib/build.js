'use strict'

const getCommonConfig = require('./config/CommonConfig')
const webpack = require('webpack')

module.exports = function build (args, callback) {
	const commonConfig = getCommonConfig()
	
	let config = Object.assign({}, commonConfig)
	// get loaders
	const loaders = require('./loader')(args)
	
	// get plugins
	const plugins = require('./plugin')(args)
	
	if (args.watch) {
		watch()
	}
	if (args.server) {
		server()
	}

	webpack(config)
}

function watch() {
	console.log('watch')
}

function server() {
	console.log('server')
}