var os = require('os');
var path = require('path');
module.exports = function getBabelConfig() {
  return {
    cacheDirectory: os.tmpdir(),
    presets: [
      [require.resolve('babel-preset-es2015'), {'modules': false}],
      require.resolve('babel-preset-stage-0'),
      require.resolve('babel-preset-react')
    ],

    plugins: [
      require.resolve('babel-plugin-transform-runtime'),
      require.resolve('babel-plugin-transform-decorators-legacy')
    ]
  };
}
