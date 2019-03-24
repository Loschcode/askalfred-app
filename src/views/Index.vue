<template>
  <div class="index" />
</template>

<script>
import gql from 'graphql-tag'
import router from '@/router'
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'

export default {
  name: 'Index',

  components: {
  },

  mixins: [
    CurrentIdentityMixin
  ],

  created () {
    if (this.isGuest()) {
      if (this.currentStep() != null) {
        return router.push({ path: `getting-started/${this.currentStep()}` })
      }
    }

    // fallback routing
    router.push({ path: 'connect/sign-in' })
  },

  methods: {
    currentStep () {
      if (this.currentIdentity.firstName == null && this.currentIdentity.lastName == null) {
        return 'what-is-your-name'
      }
      if (this.currentIdentity.email == null) {
        return 'can-i-get-your-email'
      }
      if (this.currentIdentity.confirmedAt == null) {
        return 'thank-you'
      }
    },
    isGuest () {
      return this.currentIdentity.role == 'guest'
    }
  }
}
</script>
