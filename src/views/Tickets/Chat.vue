<template>
  <div class="tickets-show">
    <!-- Subject -->
    <chat-subject>
      {{ ticket.subject }}
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
    </div>

    <!--  Notice -->
    <div v-if="ticketStatusOpened()">
      <chat-notice :status="`wait`">
        Thanks Laurent, I will get back to you as soon as possible.
      </chat-notice>
    </div>

    <!--  Notice action done -->
    <!-- <chat-notice :status="`up`">
      Your identity card has been sent successfully
    </chat-notice> -->
  </div>
</template>

<script>
import ChatMixin from '@/mixins/ChatMixin'
import getTicket from '@/graphql/queries/getTicket'
import ChatNotice from '@/components/Tickets/Chat/Notice'
import ChatSubject from '@/components/Tickets/Chat/Subject'
import ChatEventsMessage from '@/components/Tickets/Chat/Events/Message'

export default {
  name: 'TicketChat',

  components: {
    ChatNotice,
    ChatSubject,
    ChatEventsMessage
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

  apollo: {
    getTicket
  }
}
</script>

<style scoped lang="scss">
</style>
