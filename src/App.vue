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
import layoutMixin from '@/mixins/layoutMixin'

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

  mixins: [
    layoutMixin
  ],

  components: {
    ConnectRouting
  }
}
</script>

<style lang="scss">
@import "src/assets/styles/app.scss";
@import "src/assets/styles/components.scss";
</style>
