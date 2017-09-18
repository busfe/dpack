const path = require('path')

export default function getCommonConfig() {
	return {
		entry: 'app.js',
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: '[name].bundle.js'
		}
	}
}