<template>
  <div class="tickets-list">
    <div class="row center-xs">
      <div class="col-xs-12">
        <!-- Make first ticket -->
        <div class="+hidden">
          <!-- TODO : temporary for linter -->
          <first-ticket />
        </div>

        <!-- Ticket -->
        <div
          v-for="ticket in ticketsList"
          class="row center-xs"
        >
          <div class="col-xs-11 col-md-10 col-lg-9">
            <ticket-list-item :ticket="ticket" />
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import FirstTicket from '@/components/Tickets/FirstTicket'
import TicketListItem from '@/components/Tickets/TicketListItem'
import CustomerOnlyGuardMixin from '@/mixins/CustomerOnlyGuardMixin'
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'
import ticketsList from '@/graphql/queries/ticketsList'

export default {
  name: 'TicketsList',
  components: {
    FirstTicket,
    TicketListItem
  },

  mixins: [
    CurrentIdentityMixin,
    CustomerOnlyGuardMixin
  ],

  apollo: {
    ticketsList
  }
}
</script>

<style scoped lang="scss">
.tickets-list {
  padding-top: 1em;
  padding-bottom: 1em;
}
</style>
