<template>
  <div class="index">
  </div>
</template>

<script>
import gql from 'graphql-tag'
import router from '@/router'
import { currentIdentity } from '@/graphql/queries/currentIdentity'

export default {
  name: 'Index',

  data () {
    return {
      currentIdentity: null
    }
  },

  created () {
    if (this.isGuest()) {
      if (this.currentStep() == 'what-is-your-name') {
        return router.push({ path: 'getting-started/what-is-your-name' })
      }
    }

    // and from there route it if logged-in
    router.push({ path: 'connect/sign-in' })
  },

  computed: {
    identityToken () {
      return localStorage.getItem('identityToken')
    }
  },

  methods: {
    currentStep() {
      if (this.currentIdentity.firstName == null && this.currentIdentity.lastName == null) {
        return 'what-is-your-name'
      }
    },
    isGuest() {
      return this.currentIdentity.role == 'guest'
    }
  },

  apollo: {
    currentIdentity
  },

  components: {
  }
}
</script>
