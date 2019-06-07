<template>
  <div id="app">
    <!-- Notify -->
    <custom-notifications />
    <div class="blurry-wrapper">
      <component :is="currentLayout">
        <div v-if="isRawRoute()">
          <router-view />
        </div>
        <div v-else>
          <connect-routing />
        </div>
      </component>
    </div>
  </div>
</template>

<script>

import ConnectRouting from '@/components/ConnectRouting'
import LayoutMixin from '@/mixins/LayoutMixin'
import CustomNotifications from '@/components/CustomNotifications'

export default {
  name: 'App',
  components: {
    ConnectRouting,
    CustomNotifications
  },

  mixins: [
    LayoutMixin
  ],
  props: {
    rawRoute: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
    }
  },

  created () {
  },

  methods: {
    isRawRoute () {
      return this.$router.currentRoute.query.raw_route
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/styles/app.scss";
@import "src/assets/styles/components.scss";
</style>
