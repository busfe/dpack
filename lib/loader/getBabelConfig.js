var os = require('os');
var path = require('path');
var fs = require('fs');

module.exports = function getBabelConfig() {
  // 若用户有自定义的babel配置就使用用户的覆盖内置的
  const customBabelrc = path.join(process.cwd(), '.babelrc')
  if (fs.existsSync(customBabelrc)) {
    return null
  }
  
  return {
    cacheDirectory: os.tmpdir(),
    presets: [
      [require.resolve('babel-preset-es2015'), {'modules': false}],
      require.resolve('babel-preset-stage-0'),
      require.resolve('babel-preset-react')
    ],

    plugins: [
      require.resolve('babel-plugin-transform-runtime')
    ]
  };
}
