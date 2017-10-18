const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = function getCommonConfig(args) {
	const outputPath = path.resolve(process.cwd(), 'dist')
	return {
		entry: [path.resolve(process.cwd(), 'src/app.js')],
		output: {
			path: outputPath,
			filename: '[name]_[hash:7].js'
		},
		module: {
			rules: [
			]
		},
		resolve: {
			mainFiles: ['index'],
			modules: ['node_modules', path.resolve(process.cwd(), 'src')]
		},
		resolveLoader: {
			modules: ["node_modules"],
    	extensions: [".js", ".json"],
    	mainFields: ["loader", "main"]
		},
		devtool: args.env === 'dev' ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
		plugins: [
			new CleanWebpackPlugin(['dist'], {
				root: process.cwd()
			}),
			new HtmlWebpackPlugin({
				title: 'WebPack Demo',
        template: 'src/layout.html', // 源模板文件
        filename: 'index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
        inject: 'body',
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
			}),
			new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(args.env)
   		})
		]
	}
}
