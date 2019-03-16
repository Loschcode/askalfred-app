import EventBus from '@/misc/EventBus'
import PageHelper from '@/helpers/PageHelper'

class EventsService {
  constructor(vm) {
    this.vm = vm
  }

  /**
   * All the event bus related things
   */
  watch() {
    this.watchRebootEvent()
    this.watchCrashEvent()
    this.watchErrorEvent()
  }

  success(message) {
    this.vm.$noty.info(message)
  }

  reboot() {
    EventBus.$emit('rebootEvent')
  }

  error(error) {
    EventBus.$emit('errorEvent', error)
  }

  crash(error) {
    EventBus.$emit('crashEvent', error)
  }

  // private

  watchRebootEvent() {
    EventBus.$on('rebootEvent', this.onRebootEvent.bind(this))
  }

  watchCrashEvent() {
    EventBus.$on('crashEvent', this.onCrashEvent.bind(this))
  }

  watchErrorEvent() {
    EventBus.$on('errorEvent', this.onErrorEvent.bind(this))
  }

  /**
   * We put a listener to the rebootEvent
   * when a crash needs a reboot and clear cache / session
   * we use this command
   */
  onRebootEvent(error) {
    if (error) {
      console.log(error)
      localStorage.clear()
    }
    PageHelper.refreshPage()
  }

  /**
   * We put a listener to the crashEvent
   * This kind of error is major and lock the application itself
   * until the person refreshes the page entirely
   */
  onCrashEvent(error) {
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
  onErrorEvent(error) {
    this.vm.$noty.error(error)
  }

  addNetworkCrash(rawError) {
    this.vm.error = {
      message: 'Oh snap ! There is a network error, please refresh the page.',
      raw: rawError
    }
  }

  addDefaultCrash(rawError) {
    this.vm.error = {
      message: 'Oh snap ! Something went wrong, please refresh the page.',
      raw: rawError
    }
  }
}

export default EventsService
