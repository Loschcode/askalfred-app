<template>
  <div class="tickets-list">
    <div class="row center-xs">
      <div class="col-xs-12">
        <!-- Make first ticket -->
        <first-ticket />
      </div>
    </div>
  </div>
</template>

<script>
import FirstTicket from '@/components/Tickets/FirstTicket'

export default {
  name: 'TicketsIndex',
  components: {
    FirstTicket
  }
}
</script>

<style scoped lang="scss">
</style>
