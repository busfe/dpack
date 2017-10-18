/**
 * [getLoaders 获取webpack loader]
 * @param  {[type]} args [commander]
 */

 var getJsLoader = require('./getJsLoader');
 var getCssLoader = require('./getCssLoader');
 var getImgFontLoader = require('./getImgFontLoader');

module.exports = function getLoaders(webpackCfg) {
	const staticLoader = getImgFontLoader(webpackCfg);
	const cssLoaders = getCssLoader();
	const jsLoader = getJsLoader();


	const imgLoader = staticLoader.image
	const fontLoader = staticLoader.font
	return [
		cssLoaders.css,
		cssLoaders.less,
		jsLoader,
		imgLoader,
		fontLoader
	]
}
