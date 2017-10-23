'use strict'
const chalk = require('chalk')
const log = console.log

module.exports = function build(args, callback) {
	args.env = args.env || 'production'
	const compiler = require('../compile')(args)
	compiler.run((err, stats) => {
		if (err && stats.hasErrors) {
			log(chalk.red(err))
		} else {
			log(chalk.green('compile succeed!'))
		}
	})
}
