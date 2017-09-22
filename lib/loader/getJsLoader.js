
var getBabelConfig =  require('./getBabelConfig.js');

module.exports = function getJsLoader(usedBabelCfg) {
  usedBabelCfg = usedBabelCfg === void 0 ? true : usedBabelCfg;
  let jsLoaderCfg = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  };


  if (usedBabelCfg) {
    jsLoaderCfg.options = getBabelConfig()
  }
  return jsLoaderCfg
}
