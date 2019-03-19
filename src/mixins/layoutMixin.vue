<script>
export default {
  computed: {
    currentLayout () {
      return (this.rawLayout || defaultLayout) + '-layout';
    },

    rawLayout ()  {
      return this.layoutFromRoute
    },

    layoutFromRoute () {
      return this.$route.meta.layout;
    }
  }
}
</script>
