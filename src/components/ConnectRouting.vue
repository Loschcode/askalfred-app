<template>
  <div class="connect-routing">
    <!-- Crash error -->
    <div
      v-if="error"
      @click="refreshPage()"
      class="+pointer"
    >
      <div class="error">
        Error page<br />
        {{ error.message }}<br />
        {{ error.raw }}
      </div>
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
import PageHelper from '@/helpers/PageHelper'

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

  watch: {
    identityToken(oldValue, newValue) {
      console.log('identity token change')
    }
  },

  methods: {
    refreshPage () {
      PageHelper.refreshPage()
    },

    appReady () {
      return this.identityToken && this.currentIdentity
    },
  },

  components: {
  },

  apollo: {
    currentIdentity
  }

}
</script>
