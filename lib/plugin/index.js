module.exports = function getPlugins(args) {
	// option -o optimize the file
	let plugins = []
	
	if (args.optimize) {
		const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
		plugins.push(new UglifyJSPlugin())
	}
	return plugins
}