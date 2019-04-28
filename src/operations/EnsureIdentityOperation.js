import createGuest from '@/graphql/mutations/createGuest'
import EventsService from '@/services/EventsService'
import TokenHelper from '@/helpers/TokenHelper'
import IdentityHelper from '@/helpers/IdentityHelper'

export default vm => {
  const events = new EventsService(vm)

  const perform = async () => {
    if (TokenHelper.getToken() === null) await connectGuest()
    return TokenHelper.getToken()
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
