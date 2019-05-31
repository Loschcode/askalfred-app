class TextareaHelper {
  reset () {
    const select = document.querySelector('textarea')
    select.style.height = '48px'
  }
}

export default new TextareaHelper()
