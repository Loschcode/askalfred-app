import deleteGuest from '@/graphql/mutations/deleteGuest'
import EventsService from '@/services/EventsService'
import TokenHelper from '@/helpers/TokenHelper'

export default vm => {
  const events = new EventsService(vm)

  const perform = async () => {
    const token = TokenHelper.getCurrentToken()
    if (token === null) return

    try {
      await deleteGuest(vm, { token })
    } catch (error) {
      events.crash('We were unable to delete a guest user')
    }
  }

  return perform()
}
