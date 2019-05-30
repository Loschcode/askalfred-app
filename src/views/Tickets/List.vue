<template>
  <div class="tickets-list">
    <div v-if="ticketsConnection">
      <div class="row center-xs">
        <div class="col-xs-12">
          <!-- Make first ticket -->
          <div v-if="ticketsConnection.totalCount === 0">
            <first-ticket />
          </div>
          <div v-else>
            <!-- Ticket -->
            <div
              v-for="ticket in ticketsConnection.nodes"
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
                    v-if="ticketsConnection.pageInfo.hasNextPage"
                    class="button button__black-on-white button--half-squared"
                  >
                    See more requests
                  </div>
                </div>
              </div>
            </div>

            <!-- New request -->
            <div class="row center-xs">
              <div
                class="col-xs-8 col-md-6 +extend-clickable +pointer"
                @click="askAlfred()"
              >
                <div class="new-request">
                  <div class="button button__blue-on-white button--large button--bold">
                    New request
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modals -->
      <modals-ask-alfred ref="modals-ask-alfred" />
    </div>
    <div v-else>
      <div class="connect__loading">
        <loading-page :color="`blue`" />
      </div>
    </div>
  </div>
</template>

<script>
import ModalsAskAlfred from '@/components/Tickets/Modals/AskAlfred'
import OpenModalMixin from '@/mixins/OpenModalMixin'
import FirstTicket from '@/components/Tickets/FirstTicket'
import TicketListItem from '@/components/Tickets/TicketListItem'
import CustomerOnlyGuardMixin from '@/mixins/CustomerOnlyGuardMixin'
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'
import ticketsConnection from '@/graphql/queries/ticketsConnection'
import LoadingPage from '@/components/Loading/Page'

export default {
  name: 'TicketsConnection',

  components: {
    FirstTicket,
    TicketListItem,
    LoadingPage,
    ModalsAskAlfred
  },

  mixins: [
    CurrentIdentityMixin,
    CustomerOnlyGuardMixin,
    OpenModalMixin
  ],

  data () {
    return {
      ticketsFirst: 5
    }
  },

  methods: {
    askAlfred () {
      this.openModal('modals-ask-alfred')
    },

    seeMore () {
      this.ticketsFirst += 5
    }
  },

  apollo: {
    ticketsConnection
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
  padding-bottom: 2em;
}

.connect__loading {
  padding-top: 20vh;
}
</style>
