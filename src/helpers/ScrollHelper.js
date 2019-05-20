class ScrollHelper {
  toBottom () {
    window.scrollTo(0, document.body.scrollHeight)
  }
}

export default new ScrollHelper()
