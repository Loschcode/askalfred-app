import autosize from 'autosize'

class TextareaHelper {
  baseInputSize () {
    return '48px'
  }

  selector () {
    return document.querySelector('textarea')
  }

  adaptPlaceholder (callback) {
    const baseMargin = 70
    this.selector().addEventListener('autosize:resized', () => {
      const height = this.selector().clientHeight + baseMargin
      callback(height)
    })
  }

  autosize () {
    autosize(this.selector())
  }

  reset () {
    this.selector().style.height = this.baseInputSize()
  }
}

export default new TextareaHelper()
