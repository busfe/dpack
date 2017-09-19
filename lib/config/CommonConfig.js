const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = function getCommonConfig(args) {
	const outputPath = path.resolve(process.cwd(), 'dist')
	return {
		entry: path.resolve(process.cwd(), 'src/app.js'),
		output: {
			path: outputPath,
			filename: '[name]_[hash:7].js'
		},
		module: {
			rules: [
			]
		},
		plugins: [
			new CleanWebpackPlugin(['dist'], {
				root: process.cwd()
			}),
			new HtmlWebpackPlugin({
				title: 'Webpack demo'
			})
		]
	}
}