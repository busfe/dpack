/**
 * [getLoaders 获取webpack loader]
 * @param  {[type]} args [commander]
 */
 var path = require('path')
 var getCssLoader = require('./getCssLoader')
 var getStaticLoader = require('./getStaticLoader')
 var getBabelConfig = require('./getBabelConfig.js')

module.exports = function getLoaders(webpackCfg, args) {
	const staticLoader = getStaticLoader(webpackCfg)
	const cssLoaders = getCssLoader(args)
	const babelCfg = getBabelConfig()

	const imgLoader = staticLoader.image
	const fontLoader = staticLoader.font
	const svgLoader = staticLoader.svg

	const jsLoader = {
		test: /\.jsx?$/,
		exclude: /node_modules/,
		loader: 'babel-loader'
	}

	if (babelCfg) {
		jsLoader.options = babelCfg
	}
	
	return {
		js: jsLoader,
		css: cssLoaders.css,
		less: cssLoaders.less,
		image: imgLoader,
		font: fontLoader,
		svg: svgLoader
	}
}
