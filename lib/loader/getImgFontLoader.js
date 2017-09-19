/**
 * img and font loader generator
 */
var path = require('path');

module.exports = function getImgFontLoader(config) {
  let cfg = config || {};
  let limit = cfg.limit || 10000;
  let assetsPath = cfg.assetsPath || 'dist';

  return {
    image: {
      test: /\.(gif|png|jpe?g)(\?\S*)?$/,
          loader: 'url-loader',
          query: {
            limit: limit,
            name: path.posix.join(assetsPath, '[name].[hash:7].[ext]')
          }
    },
    font: {
      test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
      loader: 'url-loader',
      query: {
        limit: limit,
        name: path.posix.join(assetsPath, '[name].[hash:7].[ext]')
      }
    }
  }
}
