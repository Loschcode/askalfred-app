
class ScriptsHelper {
  loadMixPanel () {
    this.scriptFrom('/js/mixpnale.js')
  }

  scriptFrom (path) {
    let scriptElement = document.createElement('script')
    scriptElement.setAttribute('src', path)
    document.head.appendChild(scriptElement)
  }
}

export default new ScriptsHelper()
