<template>
  <div>
    <div
      v-if="ticket"
      class="tickets-chat"
    >
      <!-- Subject -->
      <chat-subject>
        <div
          class="markdown__improve"
          v-html="withMarkDown(ticket.subject)"
        />
      </chat-subject>
      <div
        v-for="event in events"
        :key="event.id"
      >
        <div v-if="event.type === 'EventMessage'">
          <chat-events-message
            :message="event.eventable"
            :event="event"
          />
        </div>
        <div v-else-if="event.type === 'EventCallToAction'">
          <chat-events-call-to-action
            :call-to-action="event.eventable"
            :event="event"
          />
        </div>
        <div v-else-if="event.type === 'EventPaymentAuthorization'">
          <chat-events-payment-authorization
            :payment-authorization="event.eventable"
            :event="event"
          />
        </div>
        <div v-else-if="event.type === 'EventDataCollectionForm'">
          <chat-events-data-collection-form
            :data-collection-form="event.eventable"
            :event="event"
          />
        </div>
        <div v-else-if="event.type === 'EventFile'">
          <chat-events-file
            :file="event.eventable"
            :event="event"
          />
        </div>
      </div>

      <!--  Notice -->
      <div class="tickets-chat__notice">
        <div v-if="ticket.status === 'opened'">
          <chat-notice :status="`opened`">
            Thanks {{ currentIdentity.firstName }}, I will get back to you as soon as possible.
          </chat-notice>
        </div>

        <div v-if="ticket.status === 'processing' && !wasAnswered()">
          <chat-notice :status="`processing`">
            I'm currently processing your request. I will get back to you very soon.
          </chat-notice>
        </div>

        <div v-if="ticket.status === 'canceled'">
          <chat-notice :status="`canceled`">
            Your request has been canceled. If you encountered a problem, let me know.
          </chat-notice>
        </div>

        <div v-if="ticket.status === 'completed'">
          <chat-notice :status="`completed`">
            Your request has been solved. Thanks for choosing me to help you out.
          </chat-notice>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="connect__loading">
        <loading-page :color="`white`" />
      </div>
    </div>
  </div>
</template>

<script>
import ChatMixin from '@/mixins/ChatMixin'
import getFullTicket from '@/graphql/queries/getFullTicket'
import ChatNotice from '@/components/Chat/Notice'
import ChatSubject from '@/components/Chat/Subject'
import ChatEventsMessage from '@/components/Chat/Events/Message'
import ChatEventsCallToAction from '@/components/Chat/Events/CallToAction'
import ChatEventsPaymentAuthorization from '@/components/Chat/Events/PaymentAuthorization'
import ChatEventsDataCollectionForm from '@/components/Chat/Events/DataCollectionForm'
import ChatEventsFile from '@/components/Chat/Events/File'
import MarkDownHelper from '@/helpers/MarkDownHelper'
import ScrollHelper from '@/helpers/ScrollHelper'
import LoadingPage from '@/components/Loading/Page'

export default {
  name: 'TicketChat',

  components: {
    ChatNotice,
    ChatSubject,
    ChatEventsMessage,
    ChatEventsCallToAction,
    ChatEventsPaymentAuthorization,
    ChatEventsDataCollectionForm,
    ChatEventsFile,
    LoadingPage
  },

  mixins: [
    ChatMixin
  ],

  data () {
    return {
      ticket: null
    }
  },

  computed: {
    ticketId () {
      return this.$route.params.id
    }
  },

  watch: {
    ticket (newValue, oldValue) {
      const wasJustLoaded = oldValue === null

      this.$nextTick(() => {
        if (wasJustLoaded) {
          ScrollHelper.toBottom()
        } else {
          const hasNewEvents = newValue.eventsConnection.nodes.length !== oldValue.eventsConnection.nodes.length
          // go down the window if
          // there are new messages / events appearing
          if (hasNewEvents) ScrollHelper.toBottom()
        }
      })
    }
  },

  mounted () {
    ScrollHelper.toBottom()
  },

  methods: {
    withMarkDown (string) {
      return MarkDownHelper.fullOf(string)
    }
  },

  apollo: {
    getFullTicket
  }
}
</script>

<style scoped lang="scss">
.tickets-chat {
}

.tickets-chat__notice {
  margin-top: 2em;
}
</style>
