#!/usr/bin/env node
'use strict'

const shelljs = require('shelljs')
const download = require('download-git-repo')
const chalk = require('chalk')
const log = console.log
const exists = require('fs').existsSync
const rm = require('rimraf').sync

module.exports = function create(project, template) {
	const templates = ['react', 'vue']
	if (templates && templates.indexOf(template) != -1) {
		if (exists(project)) {
			rm(project)
		} 
		log(chalk.green('start download git repository...'))
		download(`busfe/template-${template}`, project, function (err) {
			if (err) {
				log(chalk.red(err))
			} else {
		  	log(chalk.blue('download succeed!'))
				log(chalk.green('start install npm package...'))
				
				shelljs.cd(project)
				shelljs.exec('npm install')
				log(chalk.blue('install succeed!'))
		  }
		})
	} else {
		log(chalk.red('We only support two templates,react and vue,please check agin!'))
	}
}
