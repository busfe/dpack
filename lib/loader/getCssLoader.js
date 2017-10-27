const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')
/**
 * 获取样式对应的loader配置信息
 * @param {options}
 */
module.exports = function getStyleConfig(args) {

  let isProd = args.env === 'production';

  let commonLoader = [
    {
      loader: require.resolve('css-loader'),
      options: {
        minimize: isProd,
        modules: false,
        localIdentName: '[local]___[hash:base64:5]',
      }
    },
    {
      loader: require.resolve('postcss-loader'),
      options: {
        config: {
          path: require.resolve('../../postcss.config.js')
        }
      }
    }
  ]

  //根据loader名字生成对应的loader配置项
  function generateLoaderCfg (loader, loaderOptions) {
    let loaderUse;
    let loaders = [].concat(commonLoader); 
    if (loader) {
      loaders.push({
        loader: require.resolve(loader + '-loader'),
        options: Object.assign({}, loaderOptions)
      })
    }


    // Extract CSS when that option is specified,which is the case during production build
    if (isProd) {
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
    less: generateLoaderCfg('less')
  }

}
