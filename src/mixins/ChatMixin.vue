<script>
import getTicket from '@/graphql/queries/getTicket'
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
    getTicket
  },

  methods: {
    ticketStatusOpened () {
      return this.ticket.status === 'opened'
    },

    wasAnswered () {
      return this.FromAlfred(this.messages).length >= 1
    },

    FromAlfred (events) {
      return events.filter(
        event => event.identity.id !== this.currentIdentity.id
      )
    }
  }
}
</script>
