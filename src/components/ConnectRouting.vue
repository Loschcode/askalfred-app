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
        Loading page
      </div>
    </div>
  </div>
</template>

<script>
import getTokenOperation from '@/operations/getTokenOperation'
import EventsService from '@/services/EventsService'
import layoutMixin from '@/mixins/layoutMixin'

import { currentIdentity } from '@/graphql/queries/currentIdentity'

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
      return `error-${this.rawLayout}`
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
  },

  apollo: {
    currentIdentity
  }

}
</script>
