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
    <div class="row start-xs">
      <div class="col-xs-11 ticket-message">
        <div class="message message__yourself">
          <div class="message__yourself-arrow" />
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        </div>
      </div>
    </div>

    <!-- Myself -->
    <div class="row end-xs">
      <div class="col-xs-11 ticket-message">
        <div class="message message__myself">
          <div class="message__myself-arrow" />
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        </div>
      </div>
    </div>

    <!-- Action required -->
    <div class="row center-xs">
      <div class="col-xs-10">
        <div class="ticket-subject">
          <div class="action">
            <div class="row center-xs">
              <div class="col-xs-10">
                <div class="action__details">
                  I need a picture of your identity card
                </div>
              </div>
            </div>
            <div class="row center-xs">
              <div class="col-xs-8">
                <div class="action__button button button__blue-on-white">
                  Send now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--  Notice -->
    <div class="row center-xs">
      <div class="col-xs-8">
        <div class="ticket-notice">
          <div class="ticket-notice__symbol">
            <span class="ticket-notice__symbol-border" />
            <span class="ticket-notice__symbol-image"><img src="/images/tickets/show/icons/add.svg"></span>
            <span class="ticket-notice__symbol-border" />
          </div>
        </div>
      </div>
    </div>

    <!-- Yourself (DUPLICATE TO REMOVE) -->
    <div class="row start-xs">
      <div class="col-xs-11 ticket-message">
        <div class="message message__yourself">
          <div class="message__yourself-arrow" />
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
        </div>
      </div>
    </div>

    <!--  Notice action done -->
    <div class="row center-xs">
      <div class="col-xs-8">
        <div class="ticket-notice">
          <div class="ticket-notice__message">
            Your identity card has been sent successfully
          </div>
          <div class="ticket-notice__symbol">
            <span class="ticket-notice__symbol-border" />
            <span class="ticket-notice__symbol-image"><img src="/images/tickets/show/icons/up.svg"></span>
            <span class="ticket-notice__symbol-border" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChatMixin from '@/mixins/ChatMixin'
import getTicket from '@/graphql/queries/getTicket'
import ChatNotice from '@/components/Tickets/Chat/Notice'
import ChatSubject from '@/components/Tickets/Chat/Subject'

export default {
  name: 'TicketChat',

  components: {
    ChatNotice,
    ChatSubject
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
.ticket-message {
  margin: 1em;
  margin-bottom: 0.5em;
}

.action {
  color: $color-soft-grey;
  background-color: $color-white;
  padding: 1em;
  padding-bottom: 1em;
  @include button-radius('medium');
}

.action__details {
  padding-bottom: 1em;
}

.action__button {
  text-transform: uppercase;
  margin-bottom: -8em;
}
</style>
