import createGuest from '@/graphql/mutations/createGuest'
import EventsService from '@/services/EventsService'

export const setTokenAs = token => {
  localStorage.setItem('identityToken', token)
}

export default vm => {
  const events = new EventsService(vm)

  const perform = async () => {
    if (getToken() === null) {
      await connectGuest()
      // we have to refresh the page
      // to reload everything with tokens
      new EventsService(vm).reboot()
    }

    return getToken()
  }

  const connectGuest = async () => {
    try {
      console.log('connect guest ...')
      const response = await createGuest(vm)
      setTokenAs(response.token)
    } catch (error) {
      events.crash('We were unable to create a guest user')
    }
  }

  const getToken = () => {
    return localStorage.getItem('identityToken')
  }

  return perform()
}
