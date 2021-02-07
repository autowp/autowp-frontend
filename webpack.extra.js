const webpack = require('webpack');
module.exports = {
  plugins: [
    new webpack.ContextReplacementPlugin(/moment[/\\]locale/, /\/(be|en-gb|es|fr|pt-br|ru|uk|zh-cn)$/),
  ]
}
