import CookiesHelper from '@/helpers/CookiesHelper'
import IdentityHelper from '@/helpers/IdentityHelper'

class TokenHelper {
  setTokenAs (token) {
    localStorage.setItem('identityToken', token)
  }

  getCurrentToken () {
    return localStorage.getItem('identityToken')
  }

  eraseToken (vm) {
    // we need to unset the cookie as well because the erase
    // is used in case of emergency (crashes, non existing identities, etc.)
    CookiesHelper.unsetCookie(vm, 'token')
    localStorage.removeItem('identityToken')
  }

  resetTokenFromCookie (vm) {
    // we do not do anything if there
    // is a token present already
    if (this.getCurrentToken()) return false
    if (CookiesHelper.getCookie(vm, 'token-transmitted')) return false

    const tokenFromCookie = CookiesHelper.getCookie(vm, 'token')
    if (tokenFromCookie) {
      CookiesHelper.setCookie(vm, 'token-transmitted', true)
      IdentityHelper.setIdentityWith(tokenFromCookie)
      return true
    }
    return false
  }
}

export default new TokenHelper()
