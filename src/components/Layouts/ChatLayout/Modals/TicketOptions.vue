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
                  v-if="!isLocked()"
                  @click="cancelRequest()"
                >
                  <loading-button-red :is-loading="isCancelingRequest">
                    Cancel request
                  </loading-button-red>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Options Locked -->
      <div ref="ticket-options-locked">
        <div class="content">
          <modals-contents-locked
            :content="`This request is locked, you can't alter it anymore. Please contact support if you need anything.`"
            :action="close"
          />
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
import ModalsContentsLocked from '@/components/Modals/Contents/Locked'
import LoadingButtonRed from '@/components/Loading/Button/Red'

export default {
  name: 'ChatLayoutModalsTicketOptions',
  components: {
    ModalBody,
    ModalsContentsLocked,
    LoadingButtonRed
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

  data () {
    return {
      isCancelingRequest: false
    }
  },

  created () {
    this.notices = new NoticesService(this)
  },

  methods: {
    isLocked () {
      return this.ticket.status === 'canceled' || this.ticket.status === 'completed'
    },

    async cancelRequest () {
      if (this.isCancelingRequest) return
      this.isCancelingRequest = true

      try {
        const cancelTicketInput = { id: this.ticket.id }
        await cancelTicket(this, cancelTicketInput)
        this.currentModal().close()
        this.notices.success('This ticket was canceled.')
      } catch (error) {
        this.notices.graphError(error)
        this.currentModal().close()
      }
      this.isCancelingRequest = false
    },

    onOpen () {
      if (this.isLocked()) {
        this.currentModal().setWithContentOf(this, 'ticket-options-locked')
      } else {
        this.currentModal().setWithContentOf(this, 'ticket-options-window')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.ticket-options__locked {

}

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
