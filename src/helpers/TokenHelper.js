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
}

export default new TokenHelper()
