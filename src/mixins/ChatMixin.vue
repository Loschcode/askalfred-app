<script>
import getFullTicket from '@/graphql/queries/getFullTicket'
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'

export default {
  mixins: [
    CurrentIdentityMixin
  ],

  props: {
  },

  data () {
    return {
      ticket: null
    }
  },

  computed: {
    ticketId () {
      return this.$route.params.id
    },

    events () {
      return this.ticket.eventsConnection.nodes
    },

    messages () {
      return this.events.filter(
        event => event.type === 'EventMessage'
      )
    }
  },

  apollo: {
    getFullTicket
  },

  methods: {
    wasAnswered () {
      return this.eventsFromAlfred().length >= 1
    },

    lastAnswer () {
      return this.eventsFromAlfred().slice(-1)[0]
    },

    eventsFromAlfred (events) {
      return this.events.filter(
        event => event.identity.id !== this.currentIdentity.id
      )
    }
  }
}
</script>
