module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      sass: {
        data: `@import "src/assets/styles/helpers.scss";`
      }
    }
  },
  pluginOptions: {}
}
