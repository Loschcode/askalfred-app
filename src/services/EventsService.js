import EventBus from '@/misc/EventBus'
import PageHelper from '@/helpers/PageHelper'
import TokenHelper from '@/helpers/TokenHelper'

class EventsService {
  constructor (vm) {
    this.vm = vm
    this.current = null
  }

  /**
   * All the event bus related things
   */
  watch () {
    this.watchRebootEvent()
    this.watchCrashEvent()
    this.watchErrorEvent()
    this.watchSuccessEvent()
  }

  success (message) {
    EventBus.$emit('successEvent', message)
  }

  reboot (error) {
    EventBus.$emit('rebootEvent', error)
  }

  error (error) {
    EventBus.$emit('errorEvent', error)
  }

  graphError (error) {
    const serialized = error.graphQLErrors.map(error => error.message).join(', ')
    this.error(serialized)
  }

  crash (error) {
    EventBus.$emit('crashEvent', error)
  }

  // private

  watchRebootEvent () {
    EventBus.$on('rebootEvent', this.onRebootEvent.bind(this))
  }

  watchCrashEvent () {
    EventBus.$on('crashEvent', this.onCrashEvent.bind(this))
  }

  watchErrorEvent () {
    EventBus.$on('errorEvent', this.onErrorEvent.bind(this))
  }

  watchSuccessEvent () {
    EventBus.$on('successEvent', this.onSuccessEvent.bind(this))
  }
  /**
   * We put a listener to the rebootEvent
   * when a crash needs a reboot and clear cache / session
   * we use this command
   */
  onRebootEvent (error) {
    if (error) {
      console.log(error)
      TokenHelper.eraseToken()
    }
    PageHelper.refreshPage()
  }

  /**
   * We put a listener to the crashEvent
   * This kind of error is major and lock the application itself
   * until the person refreshes the page entirely
   */
  onCrashEvent (error) {
    if (error.message === 'Network Error') {
      this.addNetworkCrash(error)
      return
    }

    this.addDefaultCrash(error)
  }

  /**
   * We put a listener to the errorEvent
   * This kind of errors is minor and dispatch an error message
   */
  onErrorEvent (error) {
    this.vm.$notify({
      group: 'default',
      text: error,
      type: 'error'
    })
  }

  onSuccessEvent (message) {
    this.vm.$notify({
      group: 'default',
      text: message,
      type: 'success',
      duration: 700
    })
  }

  addNetworkCrash (rawError) {
    this.vm.error = {
      message: 'There is a network error, please refresh the page.',
      raw: rawError
    }
  }

  addDefaultCrash (rawError) {
    this.vm.error = {
      message:
        "We can't communicate with the server right now, please refresh the page.",
      raw: rawError
    }
  }
}

export default EventsService
