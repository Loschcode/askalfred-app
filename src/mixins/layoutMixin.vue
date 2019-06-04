<script>
export default {
  computed: {
    currentLayout () {
      return (this.rawLayout || 'Default') + 'Layout'
    },

    rawLayout () {
      return this.layoutFromRoute
    },

    layoutFromRoute () {
      return this.$route.meta.layout
    }
  }
}
</script>
