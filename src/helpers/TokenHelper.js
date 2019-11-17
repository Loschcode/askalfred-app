import CookiesHelper from '@/helpers/CookiesHelper'

class TokenHelper {
  setTokenAs (token) {
    localStorage.setItem('identityToken', token)
  }

  getCurrentToken () {
    return localStorage.getItem('identityToken')
  }

  eraseToken () {
    localStorage.removeItem('identityToken')
  }

  resetTokenFromCookie (vm) {
    // we do not do anything if there
    // is a token present already
    if (this.getCurrentToken()) return

    const tokenFromCookie = CookiesHelper.getCookie(vm, 'token')
    if (tokenFromCookie) this.setTokenAs(tokenFromCookie)
  }
}

export default new TokenHelper()
