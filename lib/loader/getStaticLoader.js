/**
 * all static assets generator except js and css
 */
var path = require('path');

module.exports = function getImgFontLoader(args) {
  const limit = 10000;
  const assetsPath = 'static';
  const hash = args.hash;
  const imageName = hash ? '[name].[hash:7].[ext]' : '[name].[ext]'
  const fontName = hash ? '[name].[hash:7].[ext]' : '[name].[ext]'
  const svnName = hash ? '[name].[hash:7].[ext]' : '[name].[ext]'

  return {
    image: {
      test: /\.(gif|png|jpe?g)(\?\S*)?$/,
      loader: 'url-loader',
      options: {
        limit: limit,
        name: path.posix.join(assetsPath, imageName)
      }
    },
    font: {
      test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
      loader: 'url-loader',
      options: {
        limit: limit,
        name: path.posix.join(assetsPath, fontName)
      }
    },
    svg: {
      test: /\.svg(\?\S*)?$/,
      loader: 'url-loader',
      options: {
        limit: limit,
        name: path.posix.join(assetsPath, svnName)
      }
    }
  }
}