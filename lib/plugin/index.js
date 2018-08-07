const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const vConsolePlugin = require('vconsole-webpack-plugin')

module.exports = function getPlugins(args) {
	let plugins = {}
	
	// option -o optimize the file
	if (args.optimize) {
		const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
		plugins['uglifyjs-webpack-plugin'] = new UglifyJSPlugin()
	}
	
	// hot replace only use in dev server
	if (args.env === 'development') {
		plugins['HotModuleReplacementPlugin'] = new webpack.HotModuleReplacementPlugin()
		plugins['NamedModulesPlugin'] =  new webpack.NamedModulesPlugin()
		plugins['VconsoleWebpackPlugin'] = new vConsolePlugin({
			filter: [],
			enable: true
		})
	}

	// extract css from js 
	if (args.env === 'production') {
		plugins['MiniCssExtractPlugin'] = new MiniCssExtractPlugin({
			filename: args.md5 ? 'static/[name]_[hash:7].css' : 'static/[name].css',
			chunkFilename: args.md5 ? 'static/[id]_[hash:7].css' : 'static/[id].css'
		})
	}
	return plugins
}