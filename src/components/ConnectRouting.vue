<template>
  <div class="connect-routing">
    <!-- LoadingPage -->
    <div v-if="appReady()">
      <!-- Load the correct page -->
      <router-view />
    </div>
    <div v-else>
      <div class="connect__loading">
        <loading-page :color="loadingColor" />
      </div>
    </div>
  </div>
</template>

<script>
import EnsureIdentityOperation from '@/operations/EnsureIdentityOperation'
import LayoutMixin from '@/mixins/LayoutMixin'
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'

import LoadingPage from '@/components/Loading/Page'
import TrackingHelper from '@/helpers/TrackingHelper'
import ErrorsHelper from '@/helpers/ErrorsHelper'
import NoticesService from '@/services/NoticesService'

export default {
  name: 'ConnectRouting',

  components: {
    LoadingPage
  },

  mixins: [
    LayoutMixin,
    CurrentIdentityMixin
  ],

  data () {
    return {
      ready: false
    }
  },

  computed: {
    loadingColor () {
      if (this.rawLayout === 'Default') return 'white'
      return 'blue'
    }
  },

  watch: {
    currentIdentity (newValue, oldValue) {
      if (newValue) {
        TrackingHelper.identify(this, newValue)
        ErrorsHelper.setContext({ identity: newValue })
      }
    }
  },

  async created () {
    await EnsureIdentityOperation(this)
  },

  mounted () {
    this.ready = true
  },

  methods: {
    appReady () {
      return this.ready && this.identityToken && this.currentIdentity
    }
  }
}
</script>

<style scoped lang="scss">
.connect__loading {
  padding-top: 35vh;
}
</style>
