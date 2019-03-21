<template>
  <div class="index">
  </div>
</template>

<script>
import gql from 'graphql-tag'
import router from '@/router'
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'

export default {
  name: 'Index',

  created () {
    if (this.isGuest()) {
      if (this.currentStep() == 'what-is-your-name') {
        return router.push({ path: 'getting-started/what-is-your-name' })
      }
    }

    // and from there route it if logged-in
    router.push({ path: 'connect/sign-in' })
  },

  methods: {
    currentStep () {
      if (this.currentIdentity.firstName == null && this.currentIdentity.lastName == null) {
        return 'what-is-your-name'
      }
    },
    isGuest () {
      return this.currentIdentity.role == 'guest'
    }
  },

  mixins: [
    CurrentIdentityMixin
  ],

  components: {
  }
}
</script>
