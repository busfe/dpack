/**
 * [getLoaders 获取webpack loader]
 * @param  {[type]} args [commander]
 */

 var getJsLoader = require('./getJsLoader');
 var getCssLoader = require('./getCssLoader');
 var getImgFontLoader = require('./getImgFontLoader');

module.exports = function getLoaders(args) {
	const staticLoader = getImgFontLoader();
	const cssLoaders = getCssLoader({extract: true});
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
