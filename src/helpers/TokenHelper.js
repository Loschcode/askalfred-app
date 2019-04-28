class TokenHelper {
  setTokenAs (token) {
    localStorage.setItem('identityToken', token)
  }

  getToken () {
    return localStorage.getItem('identityToken')
  }
}

export default new TokenHelper()
