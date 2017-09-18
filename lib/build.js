module.exports = function build(args, callback) {
	if (args.watch) {
		watch()
	}
	if (args.server) {
		server()
	}
}

function watch() {
	console.log('watch')
}

function server() {
	console.log('server')
}