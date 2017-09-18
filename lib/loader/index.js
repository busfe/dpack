/**
 * [getLoaders 获取webpack loader]
 * @param  {[type]} args [commander]
 */
module.exports = function getLoaders(args) {
	const cssLoaders = {}
	const jsLoaders = {}
	const imgLoaders = {}
	const fileLoaders = {}

	return [cssLoaders, jsLoaders, imgLoaders, fileLoaders]
}