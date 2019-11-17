import PageHelper from '@/helpers/PageHelper'
import TokenHelper from '@/helpers/TokenHelper'

class IdentityHelper {
  setIdentityWith (vm, token, redirectPath) {
    TokenHelper.setTokenAs(vm, token)

    if (redirectPath) {
      PageHelper.hardRedirectTo(redirectPath)
    } else {
      PageHelper.refreshPage()
    }
  }
}

export default new IdentityHelper()
