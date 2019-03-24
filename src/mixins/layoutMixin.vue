<script>
export default {
  computed: {
    currentLayout () {
      return (this.rawLayout || 'default') + '-layout'
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
