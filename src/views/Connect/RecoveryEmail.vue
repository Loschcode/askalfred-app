<template>
  <div>
    <div class="connect__loading">
      <loading-page :color="`white`" />
    </div>
  </div>
</template>

<script>
import router from '@/router'
import DeleteCurrentGuestOperation from '@/operations/DeleteCurrentGuestOperation'
import NoticesService from '@/services/NoticesService'
import unsetPassword from '@/graphql/mutations/unsetPassword'
import IdentityHelper from '@/helpers/IdentityHelper'

export default {
  name: 'RecoveryEmail',

  async created () {
    this.notices = new NoticesService(this)

    const recoveryToken = this.$route.query.recovery_token

    try {
      const token = await unsetPassword(this, { recoveryToken })
      await DeleteCurrentGuestOperation(this, token)
      IdentityHelper.setIdentityWith(this, token, { path: '/connect/reset-your-password' })
    } catch (error) {
      router.push({ path: '/' })
      this.notices.graphError(error)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
