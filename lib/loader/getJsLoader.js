
var getBabelConfig =  require('./getBabelConfig.js');

module.exports = function getJsLoader() {
  return {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: getBabelConfig()
  }
}
