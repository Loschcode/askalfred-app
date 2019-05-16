<script>
export default {
  data () {
    return {
      memoModal: null,
      isOpen: false
    }
  },

  methods: {
    // memoization is needed in case the page changes in-between
    // to keep the reference of the current modal
    currentModal () {
      if (!this.memoModal) this.memoModal = this.$refs['current-modal']
      return this.memoModal
    },

    close () {
      this.currentModal().close()
      this.onClose()
    },

    open () {
      this.isOpen = true
      this.$nextTick(() => {
        this.currentModal().open()
        this.onOpen()
        this.$nextTick(() => {
          this.afterOpen()
        })
      })
    },

    onOpen () {
    },

    onClose () {
    },

    afterOpen () {
    }
  }
}
</script>
