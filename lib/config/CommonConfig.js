const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CaseSensitivePathPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = function getCommonConfig(args) {
	
	const outputPath = path.resolve(process.cwd(), args.dist || 'dist');
	return {
		entry: [path.resolve(process.cwd(), 'src/index.jsx')],
		output: {
			path: outputPath,
			filename: 'js/[name]_[hash:7].js'
		},
		module: {
			rules: []
		},
		plugins: [
			new CleanWebpackPlugin([outputPath], {
				root: process.cwd()
			}),
			new HtmlWebpackPlugin(),
			new ExtractTextPlugin('css/[name]_[hash:7].css'),
			new CaseSensitivePathPlugin()
		]
	}
}
