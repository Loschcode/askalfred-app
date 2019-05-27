<template>
  <div class="tickets-chat">
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
          Thanks Laurent, I will get back to you as soon as possible.
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

    <!--  Notice action done -->
    <!-- <chat-notice :status="`up`">
      Your identity card has been sent successfully
    </chat-notice> -->
  </div>
</template>

<script>
import ChatMixin from '@/mixins/ChatMixin'
import getFullTicket from '@/graphql/queries/getFullTicket'
import ChatNotice from '@/components/Chat/Notice'
import ChatSubject from '@/components/Chat/Subject'
import ChatEventsMessage from '@/components/Chat/Events/Message'
import ChatEventsFile from '@/components/Chat/Events/File'
import MarkDownHelper from '@/helpers/MarkDownHelper'

export default {
  name: 'TicketChat',

  components: {
    ChatNotice,
    ChatSubject,
    ChatEventsMessage,
    ChatEventsFile
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

  methods: {
    withMarkDown (string) {
      return MarkDownHelper.fullConversionOf(string)
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
