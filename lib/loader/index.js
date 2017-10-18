/**
 * [getLoaders 获取webpack loader]
 * @param  {[type]} args [commander]
 */

 var getJsLoader = require('./getJsLoader');
 var getCssLoader = require('./getCssLoader');
 var getImgFontLoader = require('./getImgFontLoader');
 var getBabelConfig = require('./getBabelConfig.js');

module.exports = function getLoaders(webpackCfg, args) {
	const staticLoader = getImgFontLoader(webpackCfg);
	const cssLoaders = getCssLoader(args);
	const jsLoader = getJsLoader();

	const imgLoader = staticLoader.image
	const fontLoader = staticLoader.font

	return {
		jsLoader: {
			test: /\.jsx?$/,
			exclude: /node_modules/,
			loader: 'babel-loader',
			options: getBabelConfig()
		},
		cssLoader: cssLoaders.css,
		lessLoader: cssLoaders.less,
		imgLoader: imgLoader,
		fontLoader: fontLoader
	}
}
