import showdown from 'showdown'

class MarkDownHelper {
  fullOf (string) {
    const withNewLines = string.replace(/\r\n/g, '<br/>').replace(/\n/g, '<br/>')
    return this.fullInstance().makeHtml(withNewLines)
  }

  abstractOf (string) {
    return this.abstractInstance().makeHtml(string)
  }

  fullInstance () {
    if (!this.memFull) {
      this.memFull = new showdown.Converter({
        emoji: true,
        simpleLineBreaks: true,
        openLinksInNewWindow: true,
        simplifiedAutoLink: true,
        headerLevelStart: 2,
        strikethrough: true,
        underline: true
      // tasklists: true
      })
    }

    return this.memFull
  }

  abstractInstance () {
    if (!this.memAbstract) {
      this.memAbstract = new showdown.Converter({
        emoji: true,
        simpleLineBreaks: false,
        simplifiedAutoLink: false,
        headerLevelStart: 2
      })
    }

    return this.memAbstract
  }
}

export default new MarkDownHelper()
