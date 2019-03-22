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
import GetTokenOperation from '@/operations/GetTokenOperation'
import EventsService from '@/services/EventsService'
import LayoutMixin from '@/mixins/LayoutMixin'
import Loading from '@/components/Loading'

import currentIdentity from '@/graphql/queries/currentIdentity'

export default {
  components: {
    Loading
  },
  mixins: [LayoutMixin],
  data () {
    return {
      currentIdentity: null,
      identityToken: null,
      error: ''
    }
  },

  computed: {
    errorComponent () {
      return `${this.rawLayout}-error`
    }
  },

  async created () {
    this.identityToken = await GetTokenOperation(this)
    new EventsService(this).watch()
  },

  methods: {
    appReady () {
      return this.identityToken && this.currentIdentity
    }
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
