<template>
  <div class="tickets-show">
    <!-- Subject -->
    <chat-subject>
      {{ messages[0].eventable.body }}
    </chat-subject>

    <!--  Notice -->
    <div v-if="!wasAnswered()">
      <chat-notice :status="`wait`">
        Thanks Laurent, I will get back to you as soon as possible.
      </chat-notice>
    </div>

    <div
      v-for="message in messagesWithoutSubject"
      :key="message.id"
    >
      <div v-if="message.identity.id === currentIdentity.id">
        <!-- Myself -->
        <chat-message :from="`myself`">
          {{ message.eventable.body }}
        </chat-message>
      </div>
      <div v-else>
        <!-- Yourself -->
        <chat-message :from="`yourself`">
          {{ message.eventable.body }}
        </chat-message>
      </div>
    </div>

    <!--  Notice action done -->
    <!-- <chat-notice :status="`up`">
      Your identity card has been sent successfully
    </chat-notice> -->
  </div>
  </div>
</template>

<script>
import ChatMixin from '@/mixins/ChatMixin'
import getTicket from '@/graphql/queries/getTicket'
import ChatNotice from '@/components/Tickets/Chat/Notice'
import ChatSubject from '@/components/Tickets/Chat/Subject'
import ChatMessage from '@/components/Tickets/Chat/Message'

export default {
  name: 'TicketChat',

  components: {
    ChatNotice,
    ChatSubject,
    ChatMessage
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
