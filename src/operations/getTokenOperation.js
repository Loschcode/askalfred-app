import _ from 'lodash'
import createGuest from '@/graphql/mutations/createGuest'
import EventsService from '@/services/EventsService'

export default vm => {
  const identityToken = vm.identityToken
  const events = new EventsService(vm)

  return {
    perform() {
      if (_.isNil(vm.identityToken)) {
        connectGuest()
      }
      console.log('identityToken : ' + vm.identityToken)
    },
    //TODO : put that outside of the this scope along with perform() too?
    async connectGuest() {
      try {
        console.log('connect anonymous ...')
        const response = await createGuest(vm)
        console.log(response)
        localStorage.setItem('identityToken', response.token)
      } catch (error) {
        events.crash('We were unable to create an anonymous user')
      }
    }
  }
}
