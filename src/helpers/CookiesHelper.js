class CookiesHelper {
  setCookie (vm, label, value) {
    return vm.$cookies.set(label, value, null, null, process.env.VUE_APP_COOKIES_ORIGIN)
  }
  getCookie (vm, label) {
    return vm.$cookies.get(label, null, null, process.env.VUE_APP_COOKIES_ORIGIN)
  }
  unsetCookie (vm, label) {
    return vm.$cookies.remove(label, null, null, process.env.VUE_APP_COOKIES_ORIGIN)
  }
}

export default new CookiesHelper()
