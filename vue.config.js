const path = require('path')

module.exports = {
  publicPath: '/',
  configureWebpack: {
    extensions: ['.js', '.vue'],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/')
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "src/assets/styles/helpers.scss";`
      }
    }
  },
  pluginOptions: {}
}
