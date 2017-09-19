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
	const compiler = webpack(config)
	
	// option -w
	if (args.watch) {
		compiler.watch({

		}, (err, stats) => {
		})
	}

	if (args.server) {
		require('./compile/server')(compiler)
	}

	if (args.port) {
		console.log(args.port)
	}
}

function watch() {
	console.log('watch')
}

function server() {
	console.log('server')
}