<template>
  <div class="connect-routing">
    <!-- Crash error -->
    <div v-if="error">
      <component
        :is="errorComponent"
        :error="error"
      >
      </component>
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
import getTokenOperation from '@/operations/getTokenOperation'
import EventsService from '@/services/EventsService'
import layoutMixin from '@/mixins/layoutMixin'
import Loading from '@/components/Loading'

import currentIdentity from '@/graphql/queries/currentIdentity'

export default {
  data () {
    return {
      currentIdentity: null,
      identityToken: null,
      error: ''
    }
  },

  async created () {
    this.identityToken = await getTokenOperation(this)
    new EventsService(this).watch()
  },

  computed: {
    errorComponent() {
      return `${this.rawLayout}-error`
    }
  },

  methods: {
    appReady () {
      return this.identityToken && this.currentIdentity
    },
  },

  mixins: [
    layoutMixin
  ],

  components: {
    Loading
  },

  apollo: {
    currentIdentity
  }

}
</script>

<style scoped lang="scss">
.connect__loading {
  padding-top: 45vh;
}
</style>