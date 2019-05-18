<template>
  <div class="confirm-email">
    <div>
      <div class="connect__loading">
        <loading />
      </div>
    </div>
  </div>
</template>

<script>
import confirmEmail from '@/graphql/mutations/confirmEmail'
import DeleteCurrentGuestOperation from '@/operations/DeleteCurrentGuestOperation'
import router from '@/router'
import NoticesService from '@/services/NoticesService'
import IdentityHelper from '@/helpers/IdentityHelper'

export default {
  name: 'ConfirmEmail',

  async created () {
    this.notices = new NoticesService(this)

    const confirmationToken = this.$route.query.confirmation_token
    try {
      const token = await confirmEmail(this, { confirmationToken })
      await DeleteCurrentGuestOperation(this, token)
      IdentityHelper.setIdentityWith(token, { path: '/getting-started/surprise' })
    } catch (error) {
      router.push({ path: '/' })
      this.notices.graphError(error)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
