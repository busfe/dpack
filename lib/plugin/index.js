const  webpack = require('webpack')

module.exports = function getPlugins(args) {
	let plugins = []
	
	// option -o optimize the file
	if (args.optimize) {
		const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
		plugins.push(new UglifyJSPlugin())
	}
	
	// hot replace only use dev server
	if (args.server) {
		plugins.push(new webpack.HotModuleReplacementPlugin())
	}
	return plugins
}