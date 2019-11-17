import createGuest from '@/graphql/mutations/createGuest'
import NoticesService from '@/services/NoticesService'
import TokenHelper from '@/helpers/TokenHelper'
import IdentityHelper from '@/helpers/IdentityHelper'
import CookiesHelper from '@/helpers/CookiesHelper'

export default vm => {
  const notices = new NoticesService(vm)

  const perform = async () => {
    // if there's a cookie set with the token
    // and we don't have any current token
    // then we set the localStorage accordingly
    // TokenHelper.resetTokenFromCookie(vm)

    if (TokenHelper.getCurrentToken() === null) await connectGuest()
    return TokenHelper.getCurrentToken()
  }

  const connectGuest = async () => {
    try {
      console.log('connect guest ...')
      addToOrigin()

      const input = {
        origin: getOrigin()
      }

      const response = await createGuest(vm, input)
      IdentityHelper.setIdentityWith(response.token)
    } catch (error) {
      console.log(error)
      notices.graphError(error)
      notices.crash('We were unable to create a guest user')
    }
  }

  const getOrigin = () => {
    const cookieOrigin = CookiesHelper.getCookie(vm, 'origin')
    if (cookieOrigin) return cookieOrigin
    return {}
  }

  // add data to origin if there's something present
  // in the get variables, but without
  // overwriting the previously existing ones
  const addToOrigin = () => {
    const rootOrigin = CookiesHelper.getCookie(vm, 'origin')

    const getVariables = vm.$route.query
    const httpReferrer = getHttpReferrer()
    // referrer overwrite the variables
    // as it cannot be faked via URL gets
    const newOrigin = Object.assign({}, getVariables, httpReferrer)

    const endValue = Object.assign({}, newOrigin, rootOrigin)

    CookiesHelper.setCookie(vm, 'origin', endValue)
  }
  const getHttpReferrer = () => {
    if ((!document.referrer) || (document.referrer === '')) return {}
    return { referrer: document.referrer }
  }

  return perform()
}
