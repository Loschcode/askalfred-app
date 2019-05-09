<template>
  <div id="app">
    <!-- Notify -->
    <custom-notifications />
    <div class="tingle-content-wrapper">
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
