<template>
  <div class="ticket-options">
    <modal-body ref="current-modal" />

    <!-- modal contents -->
    <div
      v-if="isOpen"
      class="+hidden"
    >
      <!-- First modal -->
      <div ref="ticket-options-window">
        <div class="container content ticket-options-window">
          <div class="row center-xs">
            <div class="col-xs-12">
              <div class="ticket-options__title">
                More options ...
              </div>
              <div class="ticket-options__buttons">
                <div
                  class="button button__white-on-red button--squared button--bold"
                  @click="cancelRequest()"
                >
                  Cancel request
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalBody from '@/components/ModalBody'
import InnerModalMixin from '@/mixins/InnerModalMixin'
import cancelTicket from '@/graphql/mutations/cancelTicket'
import NoticesService from '@/services/NoticesService'

export default {
  name: 'ModalsMoreOptions',
  components: {
    ModalBody
  },

  mixins: [
    InnerModalMixin
  ],

  props: {
    ticket: {
      required: true,
      type: Object,
      default: null
    }
  },

  created () {
    this.notices = new NoticesService(this)
  },

  methods: {
    async cancelRequest () {
      try {
        const cancelTicketInput = { id: this.ticket.id }
        await cancelTicket(this, cancelTicketInput)
        this.currentModal().close()
        this.notices.success('This ticket was canceled.')
        // this.currentModal().setWithContentOf(this, 'ticket')
      } catch (error) {
        this.notices.graphError(error)
        this.currentModal().close()
      }
    },

    onOpen () {
      this.currentModal().setWithContentOf(this, 'ticket-options-window')
    }
  }
}
</script>

<style scoped lang="scss">
.ticket-options__title {
  font-family: $font-alternative;
}

.ticket-options__buttons {
  margin-top: 1em;
}

.content {
  @include breakpoint("lg") {
    width: 30vw;
  }
  @include breakpoint("md") {
    width: 40vw;
  }
  @include breakpoint("sm") {
    width: 50vw;
  }
  @include breakpoint("xs") {
    width: 80vw;
  }
}
</style>
