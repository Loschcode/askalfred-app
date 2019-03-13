import _ from 'lodash'
import { createAnonymousUser } from '@/graphql/models/User'
import EventsService from './EventsService'

class ConnectService {
  constructor(vm, userToken) {
    this.vm = vm
    this.userToken = userToken

    this.events = new EventsService(vm)
  }

  /**
   * We take care of the connection
   */
  perform() {
    if (!_.isNil(this.userToken)) {
      this._connectAll(this.userToken)
    } else {
      this._connectAnonymous()
    }
    console.log('userToken : ' + this.userToken)
  }

  /**
   * process the anonymous log-in
   * this will create a new user
   * and connect it completely
   */
  async _connectAnonymous() {
    try {
      console.log('connect anonymous ...')
      const response = await createAnonymousUser(this.vm)
      console.log(response)
      localStorage.setItem('userToken', response.token)
    } catch (error) {
      this.events.crash('We were unable to create an anonymous user')
    }
  }

  _connectAll() {
    try {
      // TODO : ensure connection by recovering the user ? if we can't we crash it ?
      console.log('connectAll with : ' + this.userToken)
    } catch (error) {
      this.events.crash('We were unable to connect to our socket service')
    }
  }
}

export default ConnectService
