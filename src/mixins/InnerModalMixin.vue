<script>
export default {
  data () {
    return {
      isOpen: false
    }
  },

  methods: {
    currentModal () {
      return this.$refs['current-modal']
    },

    close () {
      console.log('CLOSING YO')
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
