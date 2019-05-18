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
    }
  },

  apollo: {
    getTicket
  },

  methods: {
    wasAnswered () {
      return this.eventsFromAlfred().length >= 1
    },

    eventsFromAlfred () {
      return this.ticket.eventsConnection.nodes.filter(event => event.identity.id !== this.currentIdentity.id)
    }
  }
}
</script>
