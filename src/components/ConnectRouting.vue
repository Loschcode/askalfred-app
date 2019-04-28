<template>
  <div class="connect-routing">
    <!-- Crash error -->
    <div v-if="error">
      <component
        :is="errorComponent"
        :error="error"
      />
    </div>

    <div v-else>
      <!-- Loading -->
      <div v-if="appReady()">
        <!-- Load the correct page -->
        <router-view />
      </div>
      <div v-else>
        <div class="connect__loading">
          <loading />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EnsureIdentityOperation from '@/operations/EnsureIdentityOperation'
import EventsService from '@/services/EventsService'
import LayoutMixin from '@/mixins/LayoutMixin'
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'

import Loading from '@/components/Loading'

export default {
  components: {
    Loading
  },

  mixins: [
    LayoutMixin,
    CurrentIdentityMixin
  ],

  data () {
    return {
      error: ''
    }
  },

  computed: {
    errorComponent () {
      return `${this.rawLayout}-error`
    }
  },

  async created () {
    new EventsService(this).watch()
    await EnsureIdentityOperation(this)
  },

  methods: {
    appReady () {
      return this.identityToken && this.currentIdentity
    }
  }
}
</script>

<style scoped lang="scss">
.connect__loading {
  padding-top: 45vh;
}
</style>
