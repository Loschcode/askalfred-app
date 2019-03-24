<template>
  <div class="getting-started-index" />
</template>

<script>
import router from '@/router'
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'

export default {
  name: 'GettingStartedIndex',

  components: {
  },

  mixins: [
    CurrentIdentityMixin
  ],

  created () {
    if (!this.isGuest()) {
      router.push({ path: 'connect/sign-in' })
      return
    }

    if (this.currentStep() != null) {
      return router.push({ path: `/getting-started/${this.currentStep()}` })
    }
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
    }
  }
}
</script>
