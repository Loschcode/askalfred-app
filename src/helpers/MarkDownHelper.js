import showdown from 'showdown'

class MarkDownHelper {
  setup () {
    window.markdown = new showdown.Converter({
      emoji: true,
      simpleLineBreaks: true,
      openLinksInNewWindow: true,
      simplifiedAutoLink: true,
      headerLevelStart: 2
      // tasklists: true
    })
  }

  abstractOf (string) {
    return this.abstractInstance().makeHtml(string)
  }

  fullConversionOf (string) {
    return this.fullInstance().makeHtml(string)
  }

  fullInstance () {
    return new showdown.Converter({
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

  abstractInstance () {
    return new showdown.Converter({
      emoji: true,
      simpleLineBreaks: false,
      simplifiedAutoLink: false,
      headerLevelStart: 2
    })
  }
}

export default new MarkDownHelper()
