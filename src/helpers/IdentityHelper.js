import PageHelper from '@/helpers/PageHelper'
import TokenHelper from '@/helpers/TokenHelper'

class IdentityHelper {
  setIdentityWith (token, redirectPath) {
    TokenHelper.setTokenAs(token)

    if (redirectPath) {
      PageHelper.hardRedirectTo(redirectPath)
    } else {
      PageHelper.refreshPage()
    }
  }
}

export default new IdentityHelper()
