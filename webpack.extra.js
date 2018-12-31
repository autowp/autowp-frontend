const webpack = require('webpack');
module.exports = {
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale/, /\/(be|en-gb|fr|pt-br|ru|uk|zh-cn)$/),
  ]
}
