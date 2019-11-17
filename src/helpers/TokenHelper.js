import CookiesHelper from '@/helpers/CookiesHelper'
import IdentityHelper from '@/helpers/IdentityHelper'

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
    if (this.getCurrentToken()) return false

    const tokenFromCookie = CookiesHelper.getCookie(vm, 'token')
    if (tokenFromCookie) {
      IdentityHelper.setIdentityWith(tokenFromCookie)
      return true
    }
    return false
  }
}

export default new TokenHelper()
