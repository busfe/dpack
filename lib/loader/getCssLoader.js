var ExtractTextPlugin = require('extract-text-webpack-plugin');

/**
 * 获取样式对应的loader配置信息
 * @param {options}
 */
module.exports = function getStyleConfig(options, dev) {
  let config = options || {};

  let env = dev || process.NODE_ENV.env;

  let hasSourceMap = 'sourceMap' in config ? config.sourceMap : env !== 'production';

  let cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: env === 'production',
      sourceMap: hasSourceMap
    }
  };

  //根据loader名字生成对应的loader配置项
  function generateLoaderCfg (loader, loaderOptions) {
    let loaderUse;
    let loaders = [cssLoader,'postcss-loader']; //默认添加postcss-loader
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: hasSourceMap
        })
      })
    }

    // Extract CSS when that option is specified,which is the case during production build
    if (config.extract) {
      loaderUse = ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'style-loader'
      });
    } else {
      loaderUse = ['style-loader'].concat(loaders)
    }

    return {
      test: new RegExp(`\\.${loader || 'css'}$`),
      use: loaderUse
    }
  }

  let sassLoader = generateLoaderCfg('sass');

  return {
    css: generateLoaderCfg(),
    less: generateLoaderCfg('less'),
    sass: sassLoader,
    scss: sassLoader,
    stylus: generateLoaderCfg('stylus')
  }

}
