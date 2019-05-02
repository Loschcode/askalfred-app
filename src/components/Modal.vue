<template>
  <div>
    <!-- Blank slate, keep it this way -->
  </div>
</template>

<script>
import tingle from 'tingle.js'

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

    setupModal () {
      var vm = this
      this.modal = new tingle.modal({
        closeMethods: ['overlay', 'button', 'escape'],
        onOpen () {
          vm.isOpened = true
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
