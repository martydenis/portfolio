const { merge } = require('webpack-merge');

module.exports = merge(require('./webpack.base.js'), {
  mode: 'production',
  output: {
    clean: true,
  },
  devtool: 'source-map'
})