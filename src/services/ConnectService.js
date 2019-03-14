import _ from 'lodash'
import createGuest from '@/graphql/mutations/createGuest'
import EventsService from './EventsService'

class ConnectService {
  constructor(vm, identityToken) {
    this.vm = vm
    this.identityToken = identityToken

    this.events = new EventsService(vm)
  }

  /**
   * We take care of the connection
   */
  perform() {
    if (!_.isNil(this.identityToken)) {
      this._connectAll(this.identityToken)
    } else {
      this._connectAnonymous()
    }
    console.log('identityToken : ' + this.identityToken)
  }

  /**
   * process the anonymous log-in
   * this will create a new user
   * and connect it completely
   */
  async _connectAnonymous() {
    try {
      console.log('connect anonymous ...')
      const response = await createGuest(this.vm)
      console.log(response)
      localStorage.setItem('identityToken', response.token)
    } catch (error) {
      this.events.crash('We were unable to create an anonymous user')
    }
  }

  _connectAll() {
    try {
      console.log(
        'TODO: maybe use this in the connection module ? ' + this.identityToken
      )
    } catch (error) {
      this.events.crash('We were unable to connect to our socket service')
    }
  }
}

export default ConnectService
