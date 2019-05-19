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
          <loading :color="loadingColor" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EnsureIdentityOperation from '@/operations/EnsureIdentityOperation'
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
      error: '',
      ready: false
    }
  },

  computed: {
    errorComponent () {
      return 'default-error'
    },

    loadingColor () {
      if (this.rawLayout === 'default') {
        return 'white'
      } else {
        return 'blue'
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
