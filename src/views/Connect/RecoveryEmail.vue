<template>
  <div>
    <div class="connect__loading">
      <loading />
    </div>
  </div>
</template>

<script>
import router from '@/router'
import DeleteCurrentGuestOperation from '@/operations/DeleteCurrentGuestOperation'
import EventsService from '@/services/EventsService'
import unsetPassword from '@/graphql/mutations/unsetPassword'
import IdentityHelper from '@/helpers/IdentityHelper'

export default {
  name: 'RecoveryEmail',

  async created () {
    this.events = new EventsService(this)

    const recoveryToken = this.$route.query.recovery_token

    try {
      const token = await unsetPassword(this, { recoveryToken })
      await DeleteCurrentGuestOperation(this, token)
      IdentityHelper.setIdentityWith(token, { path: '/connect/reset-your-password' })
    } catch (error) {
      router.push({ path: '/' })
      this.events.graphError(error)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
