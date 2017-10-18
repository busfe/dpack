const ExtractTextPlugin = require('extract-text-webpack-plugin')

/**
 * 获取样式对应的loader配置信息
 * @param {options}
 */
module.exports = function getStyleConfig() {

  let env = process.env.NODE_ENV;

  let isProd = env === 'production';

  let cssLoader = {
    loader: require.resolve('css-loader'),
    options: {
      minimize: isProd,
      sourceMap: !isProd
    }
  };

  //根据loader名字生成对应的loader配置项
  function generateLoaderCfg (loader, loaderOptions) {
    let loaderUse;
    let loaders = [cssLoader]; 
    if (loader) {
      loaders.push({
        loader: require.resolve(loader + '-loader'),
        options: Object.assign({}, loaderOptions, {
          sourceMap: !isProd
        })
      })
    }


    // Extract CSS when that option is specified,which is the case during production build
    if (config.extract) {
      loaderUse = ExtractTextPlugin.extract({
        fallback: require.resolve('style-loader'),
        use: loaders
      });
    } else {
      loaderUse = [require.resolve('style-loader')].concat(loaders)
    }

    return {
      test: new RegExp(`\\.${loader || 'css'}$`),
      use: loaderUse
    }
  }

  return {
    css: generateLoaderCfg(),
    less: generateLoaderCfg('less', {modules: true})
  }

}
