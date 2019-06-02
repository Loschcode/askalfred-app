<template>
  <div class="sign-out" />
</template>

<script>
import TokenHelper from '@/helpers/TokenHelper'
import PageHelper from '@/helpers/PageHelper'
import TrackingHelper from '@/helpers/TrackingHelper'
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'
import deleteGuest from '@/graphql/mutations/deleteGuest'
import NoticesService from '@/services/NoticesService'

export default {
  name: 'SignOut',

  mixins: [
    CurrentIdentityMixin
  ],

  created () {
    this.notices = new NoticesService(this)
    // When we disconnect as a guest
    // we also remove it entirely
    if (this.currentIdentity.role === 'guest') this.removeGuest()
    this.signOut()
  },

  methods: {
    async removeGuest () {
      try {
        const token = this.currentIdentity.token
        await deleteGuest(this, { token })
      } catch (error) {
        this.notices.crash('We were unable to delete a guest user')
      }
    },
    signOut () {
      TrackingHelper.signedOutManually(this)
      TokenHelper.eraseToken()

      // if it's a guest we want to restart the getting started
      // it might have been a "get stuck" event
      if (this.currentIdentity.role === 'guest') {
        PageHelper.hardRedirectTo({ path: '/getting-started' })
      } else {
        PageHelper.hardRedirectTo({ path: '/' })
      }
    }

  }
}
</script>

<style scoped lang="scss">
</style>
