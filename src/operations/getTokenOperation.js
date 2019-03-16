import _ from 'lodash'
import createGuest from '@/graphql/mutations/createGuest'
import EventsService from '@/services/EventsService'

export default vm => {
  const events = new EventsService(vm)

  const perform = async () => {
    if (getToken() == null) await connectGuest()
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

  const setTokenAs = token => {
    localStorage.setItem('identityToken', token)
  }

  const getToken = () => {
    return localStorage.getItem('identityToken')
  }

  return perform()
}
