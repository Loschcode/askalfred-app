import createGuest from '@/graphql/mutations/createGuest'
import NoticesService from '@/services/NoticesService'
import TokenHelper from '@/helpers/TokenHelper'
import IdentityHelper from '@/helpers/IdentityHelper'
import CookiesHelper from '@/helpers/CookiesHelper'

export default vm => {
  const notices = new NoticesService(vm)

  const perform = async () => {
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
    const newOrigin = vm.$route.query
    const endValue = Object.assign({}, newOrigin, rootOrigin)

    CookiesHelper.setCookie(vm, 'origin', endValue)
  }

  return perform()
}
