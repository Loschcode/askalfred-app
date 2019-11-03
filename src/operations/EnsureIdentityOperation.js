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

  return perform()
}
