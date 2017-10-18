const  webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
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

	// if
	if (true) {
		plugins.push(new ExtractTextPlugin({
			filename: "css/[name]_[contenthash:7].css",
			disable: false,
			allChunks: true
		}))
	}
	return plugins
}