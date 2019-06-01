<template>
  <div class="sign-out" />
</template>

<script>
import TokenHelper from '@/helpers/TokenHelper'
import PageHelper from '@/helpers/PageHelper'
import TrackingHelper from '@/helpers/TrackingHelper'

export default {
  name: 'SignOut',

  created () {
    this.signOut()
  },

  methods: {
    signOut () {
      TrackingHelper.signedOutManually(this)
      TokenHelper.eraseToken()
      PageHelper.hardRedirectTo({ path: '/getting-started' })
    }

  }
}
</script>

<style scoped lang="scss">
</style>
