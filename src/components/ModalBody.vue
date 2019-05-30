<template>
  <div>
    <!-- Blank slate, keep it this way -->
  </div>
</template>

<script>
import Tingle from 'tingle.js'

export default {
  name: 'Modal',
  props: {
  },

  data () {
    return {
      tingle: null,
      modal: null,
      isOpened: false,
      content: ''
    }
  },

  watch: {
    content (next, prev) {
      this.modal.setContent(next)
    }
  },

  created () {
  },

  beforeDestroy () {
    this.modal.destroy()
  },

  mounted () {
    this.setupModal()
  },

  methods: {
    open () {
      this.renderModal()
    },

    close () {
      this.unloadModal()
    },

    hide () {
      // we destroy the physical modal
      // but the container will still be there.
      // this can be very useful when opening a modal within a modal
      // so we hide the first modaland destroy the display
      // to show the second modal (it can be recursive
      this.modal.destroy()
      // we re-set it up after to enable same actions
      this.setupModal()
    },

    setupModal () {
      // const elements = document.getElementsByClassName('tingle-modal')
      // for (let element of elements) {
      //   if (element.parentNode) element.parentNode.removeChild(element)
      // }

      var vm = this

      // eslint-disable-next-line new-cap
      this.modal = new Tingle.modal({
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: '',
        onOpen () {
          vm.isOpened = true

          // var close = document.querySelector('.tingle-modal__close')
          // close.innerHTML = ' '
          // var modalContent = document.querySelector('.tingle-modal-box__content')
          // modalContent.appendChild(close)
        },
        onClose () {
          vm.isOpened = false
        },
        beforeClose () {
          return true
        }
      })
    },

    renderModal () {
      this.modal.open()
    },

    unloadModal () {
      this.modal.close()
    },

    setWithContentOf (context, ref) {
      this.content = context.$refs[ref]
    }
  }
}
</script>

<style scoped lang="scss">
</style>
