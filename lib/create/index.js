#!/usr/bin/env node
'use strict'

const shelljs = require('shelljs')
const download = require('download-git-repo')
const chalk = require('chalk')
const ora = require('ora')
const spawn = require('child_process').spawn
const log = console.log
const exists = require('fs').existsSync
const rm = require('rimraf').sync

module.exports = function create(project, template) {
	const templates = ['react', 'vue']
	if (template && templates.indexOf(template) != -1) {
		if (exists(project)) {
			rm(project)
		} 
		const spinner = ora('downloading git repository...').start()
		download(`busfe/template-${template}`, project, function (err) {
			if (err) {
				spinner.fail(err);
			} else {
				spinner.succeed('download succeed!')
				log(chalk.green('start install npm package...\n'))

				shelljs.cd(project)
				const spawnChild = spawn('npm install', {stdio: 'inherit', shell: true, async: true})
				spawnChild.on('close', function(){
					log(chalk.blue('install succeed!'))
				})
		  }
		})
	} else {
		log(chalk.red('We only support two templates,react and vue,please check again!'))
	}
}
