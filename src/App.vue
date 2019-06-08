<template>
  <div id="app">
    <!-- Crash error -->
    <div v-if="error">
      <component :is="`DefaultLayout`">
        <component
          :is="`DefaultError`"
          :error="error"
        />
      </component>
    </div>
    <div v-else>
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
  </div>
  </div>
</template>

<script>

import ConnectRouting from '@/components/ConnectRouting'
import LayoutMixin from '@/mixins/LayoutMixin'
import CustomNotifications from '@/components/CustomNotifications'
import NoticesService from '@/services/NoticesService'

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
      error: null
    }
  },

  created () {
    this.notices = new NoticesService(this)
    this.notices.watch()
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
