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
import router from '@/router'
import Loading from '@/components/Loading'
import EventsService from '@/services/EventsService'
import IdentityHelper from '@/helpers/IdentityHelper'

export default {
  name: 'ConfirmEmail',
  components: {
    Loading
  },

  async created () {
    this.events = new EventsService(this)

    const confirmationToken = this.$route.query.confirmation_token

    try {
      const token = await confirmEmail(this, { confirmationToken })
      IdentityHelper.setIdentityWith(token, { path: '/getting-started/surprise' })
    } catch (error) {
      router.push({ path: '/connect/sign-in' })
      this.events.graphError(error)
    }
  }
}
</script>

<style scoped lang="scss">
</style>
