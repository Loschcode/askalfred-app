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
      router.push({ path: '/connect/sign-in' })
      return
    }

    if (this.currentStep() !== null) {
      router.push({ path: `/getting-started/${this.currentStep()}` })
      return
    }
    router.push({ path: '/connect/sign-in' })
  },

  methods: {
    currentStep () {
      if (this.currentIdentity.firstName === null && this.currentIdentity.lastName === null) {
        return 'what-is-your-name'
      }
      if (this.currentIdentity.email === null) {
        return 'can-i-get-your-email'
      }

      if (this.currentIdentity.confirmedAt === null) {
        return 'thank-you'
      }

      if (this.currentIdentity.creditsCount === 0) {
        return 'surprise'
      }

      if (this.currentIdentity.encryptedPassword === null) {
        return 'do-not-forget'
      }

      return null
    }
  }
}
</script>
