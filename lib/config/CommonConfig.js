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
		plugins: {
			'clean-webpack-plugin': new CleanWebpackPlugin([outputPath], {
				root: process.cwd()
			}),
			'extract-text-webpack-plugin': new ExtractTextPlugin('css/[name]_[hash:7].css'),

			'html-webpack-plugin': new HtmlWebpackPlugin({
				title: 'WebPack Demo',
        template: 'src/index.html', // 源模板文件
        filename: 'index.html', // 输出文件【注意：这里的根路径是module.exports.output.path】
        inject: 'body',
        minify: {
          removeComments: true,
          collapseWhitespace: true
        }
			}),
			CommonsChunkPlugin: [ // 该插件可以同时配合多个
				// split vendor js into its own file
				new webpack.optimize.CommonsChunkPlugin({
					name: 'vendor',
					filename: 'js/vender_[hash:7].js'
				}),
				// extract webpack runtime and module manifest to its own file in order to
				// prevent vendor hash from being updated whenever app bundle is updated
				new webpack.optimize.CommonsChunkPlugin({
					name: 'manifest',
					chunks: ['vendor']
				}),
			],
			'case-sensitive-paths-webpack-plugin': new CaseSensitivePathPlugin()
		}
	}
}
