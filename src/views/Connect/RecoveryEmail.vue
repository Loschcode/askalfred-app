<template>
  <div>
    <div class="connect__loading">
      <loading />
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import router from '@/router'
import EventsService from '@/services/EventsService'
import unsetPassword from '@/graphql/mutations/unsetPassword'
import IdentityHelper from '@/helpers/IdentityHelper'
import Loading from '@/components/Loading'

export default {
  name: 'RecoveryEmail',
  components: {
    Loading
  },

  async created () {
    this.events = new EventsService(this)
    const recoveryToken = this.$route.query.recovery_token

    try {
      const token = await unsetPassword(this, { recoveryToken })
      IdentityHelper.setIdentityWith(token, { path: '/connect/reset-your-password' })
    } catch (error) {
      router.push({ path: '/connect/sign-in' })
      this.events.graphError(error)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
