<template>
  <div id="app">
    <component :is="currentLayout">
      <div v-if="isRawRoute()">
        <router-view />
      </div>
      <div v-else>
        <connect-routing />
      </div>
    </component>
  </div>
</template>

<script>
const defaultLayout = 'default';
import ConnectRouting from '@/components/ConnectRouting'

export default {
  props: [
    'rawRoute'
  ],

  data () {
    return {

    }
  },

  methods: {
    isRawRoute () {
      return this.$router.currentRoute.query.raw_route
    }
  },

  computed: {
    currentLayout () {
      return (this.layoutFromRoute || defaultLayout) + '-layout';
    },

    layoutFromRoute () {
      return this.$route.meta.layout;
    }
  },

  components: {
    ConnectRouting
  }
}
</script>

<style lang="scss">
@import "src/assets/styles/app.scss";
@import "src/assets/styles/components.scss";
</style>
