const  webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
module.exports = function getPlugins(args) {
	let plugins = {}
	
	// option -o optimize the file
	if (args.optimize) {
		const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
		plugins['uglifyjs-webpack-plugin'] = new UglifyJSPlugin()
	}
	
	// hot replace only use dev server
	if (args.env === 'development') {
		plugins['HotModuleReplacementPlugin'] = new webpack.HotModuleReplacementPlugin()
		plugins['NamedModulesPlugin'] =  new webpack.NamedModulesPlugin()
	}

	// extract css from js 
	if (args.env === 'production') {
		const filename = args.md5 ? 'static/[name]_[hash:7].css' : 'static/[name].css'
		
		plugins['extract-text-webpack-plugin'] = new ExtractTextPlugin({
			filename: filename,
			disable: false,
			allChunks: true
		})
	}
	return plugins
}