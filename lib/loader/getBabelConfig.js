var os = require('os');
var path = require('path');
module.exports = function getBabelConfig() {
  return {
    cacheDirectory: os.tmpdir(),
    presets: [['es2015', {'modules': false}], 'stage-0', 'react'],
    plugins: [
      require.resolve('babel-plugin-transform-runtime'),
      require.resolve('babel-plugin-transform-decorators-legacy')
    ]
  };
}
