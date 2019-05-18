import createGuest from '@/graphql/mutations/createGuest'
import NoticesService from '@/services/NoticesService'
import TokenHelper from '@/helpers/TokenHelper'
import IdentityHelper from '@/helpers/IdentityHelper'

export default vm => {
  const events = new NoticesService(vm)

  const perform = async () => {
    if (TokenHelper.getCurrentToken() === null) await connectGuest()
    return TokenHelper.getCurrentToken()
  }

  const connectGuest = async () => {
    try {
      console.log('connect guest ...')
      const response = await createGuest(vm)
      IdentityHelper.setIdentityWith(response.token)
    } catch (error) {
      events.crash('We were unable to create a guest user')
    }
  }

  return perform()
}
