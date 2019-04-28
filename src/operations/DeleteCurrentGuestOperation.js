import deleteGuest from '@/graphql/mutations/deleteGuest'
import EventsService from '@/services/EventsService'
import TokenHelper from '@/helpers/TokenHelper'

export default (vm, newToken) => {
  const events = new EventsService(vm)

  const perform = async () => {
    const token = TokenHelper.getCurrentToken()
    // we should never try to remove the current guest
    // if the new identity token is the same than
    // the one we want to remove or if it's empty
    if (token === null) return
    if (newToken === token) return

    try {
      await deleteGuest(vm, { token })
    } catch (error) {
      events.crash('We were unable to delete a guest user')
    }
  }

  return perform()
}
