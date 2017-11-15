/**
 * [getLoaders 获取webpack loader]
 * @param  {[type]} args [commander]
 */
 const path = require('path')
 const getCssLoader = require('./getCssLoader')
 const getStaticLoader = require('./getStaticLoader')
 const getBabelConfig = require('./getBabelConfig.js')

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
		loader: require.resolve('babel-loader')
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
