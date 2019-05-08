<template>
  <div class="tickets-list">
    <div v-if="ticketsList">
      <div class="row center-xs">
        <div class="col-xs-12">
          <!-- Make first ticket -->
          <div v-if="ticketsList.items.size === 0">
            <first-ticket />
          </div>
          <div v-else>
            <!-- Ticket -->
            <div
              v-for="ticket in ticketsList.items"
              :key="ticket.id"
              class="row center-xs"
            >
              <div class="col-xs-11 col-md-10 col-lg-9">
                <ticket-list-item :ticket="ticket" />
              </div>
            </div>
            <div class="row center-xs">
              <div class="col-xs-8">
                <div
                  class="tickets-list__see-more"
                  @click="seeMore()"
                >
                  <div
                    v-if="ticketsList.pageInfo.hasNextPage"
                    class="button button__black-on-white button--half-squared"
                  >
                    See more requests
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="connect__loading">
        <loading-blue />
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
import LoadingBlue from '@/components/LoadingBlue'

export default {
  name: 'TicketsList',

  components: {
    FirstTicket,
    TicketListItem,
    LoadingBlue
  },

  mixins: [
    CurrentIdentityMixin,
    CustomerOnlyGuardMixin
  ],

  data () {
    return {
      ticketsListInput: {
        limit: 5
      }
    }
  },

  methods: {
    seeMore () {
      this.ticketsListInput = {
        limit: this.ticketsListInput.limit + 5
      }
    }
  },

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

.tickets-list__see-more {
  padding-top: 1em;
}

.connect__loading {
  padding-top: 20vh;
}
</style>
