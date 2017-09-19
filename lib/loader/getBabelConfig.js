var os = require('os');

module.exports = function getBabelConfig() {
  return {
    cacheDirectory: os.tmpdir(),
    presets: [['es2015', {'modules': false}], 'stage-0', 'react'],
    plugins: [
      'transform-runtime',
      'transform-decorators-legacy'
    ]
  };
}
