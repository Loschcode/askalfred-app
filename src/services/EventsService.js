import EventBus from '@/misc/EventBus'
import PageHelper from '@/helpers/PageHelper'

class EventsService {
  constructor(vm) {
    this.vm = vm
  }

  /**
   * All the event bus related things
   */
  setup() {
    this._setupRebootEvent()
    this._setupCrashEvent()
    this._setupErrorEvent()
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

  _setupRebootEvent() {
    EventBus.$on('rebootEvent', this._onRebootEvent.bind(this))
  }

  _setupCrashEvent() {
    EventBus.$on('crashEvent', this._onCrashEvent.bind(this))
  }

  _setupErrorEvent() {
    EventBus.$on('errorEvent', this._onErrorEvent.bind(this))
  }

  /**
   * We put a listener to the rebootEvent
   * when a crash needs a reboot and clear cache / session
   * we use this command
   */
  _onRebootEvent(error) {
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
  _onCrashEvent(error) {
    if (error.message === 'Network Error') {
      this._addNetworkCrash(error)
      return
    }

    this._addDefaultCrash(error)
  }

  /**
   * We put a listener to the errorEvent
   * This kind of errors is minor and dispatch an error message
   */
  _onErrorEvent(error) {
    this.vm.$noty.error(error)
  }

  _addNetworkCrash(rawError) {
    this.vm.error = {
      message: 'Oh snap ! There is a network error, please refresh the page.',
      raw: rawError
    }
  }

  _addDefaultCrash(rawError) {
    this.vm.error = {
      message: 'Oh snap ! Something went wrong, please refresh the page.',
      raw: rawError
    }
  }
}

export default EventsService
