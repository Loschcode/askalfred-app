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

    <!-- Yourself -->
    <chat-message :from="`yourself`">
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
    </chat-message>

    <!-- Myself -->
    <chat-message :from="`myself`">
      Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
    </chat-message>

    <!--  Notice action done -->
    <chat-notice :status="`up`">
      Your identity card has been sent successfully
    </chat-notice>
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
