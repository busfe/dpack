const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathPlugin = require('case-sensitive-paths-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const webpack = require('webpack')

module.exports = function getCommonConfig(args) {
	const hash = args.md5
	const outputPath = path.resolve(process.cwd(), args.dist || 'dist')
	const filename = hash ? 'static/[name]_[chunkhash:7].js' : 'static/[name].js'
	const chunkFilename = hash ? 'static/[id]_[chunkhash:7].js' : 'static/[id].js'
	return {
		entry: {
			index: path.resolve(process.cwd(), 'src/index.jsx')
		},
		output: {
			path: outputPath,
			filename,
			chunkFilename
		},
		module: {
			rules: {}
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
		plugins: {
			'clean-webpack-plugin': new CleanWebpackPlugin([outputPath], {
				root: process.cwd()
			}),

			'html-webpack-plugin': new HtmlWebpackPlugin({
				title: 'WebPack Demo',
        template: 'index.html', // 源模板文件
        filename: 'index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
        inject: 'body',
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
			}),
			'CommonsChunkPlugin': [ // 该插件可以同时配合多个
				// split vendor js into its own file
				new webpack.optimize.CommonsChunkPlugin({
					name: 'vendor',
					minChunks: function (module) {
						return (
							module.resource &&
							/\.js$/.test(module.resource) &&
							module.resource.indexOf(path.join(process.cwd(), 'node_modules')) === 0
						)
					}
				}),
				// extract webpack runtime and module manifest to its own file in order to
				// prevent vendor hash from being updated whenever app bundle is updated
				new webpack.optimize.CommonsChunkPlugin({
					name: 'manifest',
					chunks: ['vendor']
				}),
			],
			'case-sensitive-paths-webpack-plugin': new CaseSensitivePathPlugin(),
			'DefinePlugin': new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(args.env)
			 }),
			'friendly-errors-webpack-plugin': new FriendlyErrorsPlugin()
		}
	}
}
