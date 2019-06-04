const path = require('path')

module.exports = {
  publicPath: '/',
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        'vue$': 'vue/dist/vue.runtime.min.js',
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
