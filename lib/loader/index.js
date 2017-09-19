/**
 * [getLoaders 获取webpack loader]
 * @param  {[type]} args [commander]
 */

 import getJsLoader from './getJsLoader';
 import getCssLoader from './getCssLoader';
 import getImgFontLoader from './getImgFontLoader';

module.exports = function getLoaders(args) {
	const staticLoader = getImgFontLoader();
	const cssLoaders = getCssLoader();
	const jsLoaders = getJsLoader();


	const imgLoaders = staticLoader.image
	const fontLoaders = staticLoader.font

	return [
		cssLoaders.css,
		cssLoaders.less,
		jsLoaders,
		imgLoaders,
		fontLoader
	]
}
