const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathPlugin = require('case-sensitive-paths-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')
module.exports = function getCommonConfig(args) {
	const hash = args.md5
	const outputPath = args.dest ||  path.resolve(process.cwd(), 'dist')
	const filename = hash ? 'static/[name]_[hash:7].js' : 'static/[name].js'
	const chunkFilename = hash ? 'static/[id]_[hash:7].js' : 'static/[id].js'
	return {
		entry: {
			index: path.resolve(process.cwd(), 'src/bootstrap.js')
		},
		output: {
			path: outputPath,
			filename,
			chunkFilename
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all'
					}
				}
				// chunks: 'all',
				// name: 'common',
			}
		},
		module: {
			rules: {}
		},
		resolve: {
			mainFiles: ['index', 'index.jsx'],
			modules: ['node_modules', path.resolve(process.cwd(), 'src')]
		},
		resolveLoader: {
			modules: ["node_modules"],
    	extensions: [".js", ".json", ".jsx", ".vue", ".ts"],
    	mainFields: ["loader", "main"]
		},
		devtool: args.env === 'development' ? 'cheap-module-eval-source-map' : 'cheap-module-source-map',
		mode: args.env,
		plugins: {
			'clean-webpack-plugin': new CleanWebpackPlugin([outputPath], {
				root: process.cwd()
			}),
			'html-webpack-plugin': new HtmlWebpackPlugin({
				title: 'WebPack Demo',
        template: path.resolve(process.cwd(), 'src/layout.html'), // 源模板文件
        filename: 'index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
        inject: 'body',
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
			}),
			'case-sensitive-paths-webpack-plugin': new CaseSensitivePathPlugin(),
			'friendly-errors-webpack-plugin': new FriendlyErrorsPlugin()
		}
	}
}
