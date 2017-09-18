const path = require('path')

module.exports = function getCommonConfig(args) {
	return {
		entry: './src/app.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name]_[hash:7].js'
		},
		module: {
			rules: [
				
			]
		}
	}
}