import autosize from 'autosize'

class TextareaHelper {
  baseInputSize () {
    return '48px'
  }

  selector () {
    return document.querySelector('textarea')
  }

  adaptPlaceholder (callback) {
    this.selector().addEventListener('autosize:resized', () => {
      const height = this.currentHeight()
      callback(height)
    })
  }

  currentHeight () {
    const baseMargin = 70
    return this.selector().clientHeight + baseMargin
  }

  autosize () {
    autosize(this.selector())
  }

  reset () {
    this.selector().style.height = this.baseInputSize()
  }
}

export default new TextareaHelper()
