
var getBabelConfig =  require('./getBabelConfig.js');

module.exports = function getJsLoader(usedBabelCfg) {
  usedBabelCfg = usedBabelCfg || true;
  let jsLoaderCfg = {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader'
  };


  if (usedBabelCfg) {
    jsLoaderCfg.options = getBabelConfig()
  }
  return jsLoaderCfg
}
