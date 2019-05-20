class ScrollService {
  constructor (vm) {
    this.vm = vm
  }

  scrollToBottom () {
    window.scrollTo(0, document.body.scrollHeight)
  }
}

export default ScrollService
