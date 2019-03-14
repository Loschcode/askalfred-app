<template>
  <div class="connect-routing">
    <!-- TODO : make the whole fucking error page to start with -->
    <!-- Crash error -->
    <div
      v-if="error"
      @click="refreshPage()"
      class="+pointer"
    >
      <div class="error">
        {{ error.message }}
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
        THIS IS LOADING IT NEEDS SOME STYLING OBVIOUSLY
      </div>
    </div>
  </div>
</template>

<script>
import ConnectService from '@/services/ConnectService'
import EventsService from '@/services/EventsService'
import PageHelper from '@/helpers/PageHelper'

import { currentIdentity } from '@/graphql/models/Identity'

export default {
  data () {
    return {
      currentIdentity: null,
      error: ''
    }
  },

  created () {
    Object.assign(this, {
      eventsService:  new EventsService(this),
      connectService: new ConnectService(this, this.identityToken)
    })

    this.eventsService.setup()
    this.connectService.perform()
  },

  watch: {
    identityToken (newValue, oldValue) {
      // new ConnectService(this, newValue).perform()
    }
  },

  computed: {
    identityToken () {
      return localStorage.getItem('identityToken')
    }
  },

  methods: {
    refreshPage () {
      PageHelper.refreshPage()
    },

    appReady () {
      return this.identityToken && this.currentIdentity
    }
  },

  components: {
  },

  apollo: {
    currentIdentity
  }

}
</script>
