class TokenHelper {
  setTokenAs (token) {
    localStorage.setItem('identityToken', token)
  }

  getCurrentToken () {
    return localStorage.getItem('identityToken')
  }

  eraseToken () {
    localStorage.setItem('identityToken', null)
  }
}

export default new TokenHelper()
