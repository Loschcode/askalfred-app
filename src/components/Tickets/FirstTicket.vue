<template>
  <div class="first-ticket">
    <div class="row center-xs">
      <div class="col-xs-6">
        <div class="first-ticket__image">
          <img src="/images/tickets/chat/rocket-first-ticket.svg">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div class="first-ticket__text">
          You don’t have any request yet
        </div>
      </div>
    </div>
    <div class="row center-xs">
      <div class="col-xs-10">
        <div class="first-ticket__button">
          <div
            class="button button__blue-on-white button--large button--bold"
            @click="askAlfred()"
          >
            Make your first request
          </div>
        </div>
      </div>
    </div>
    <!-- Modals -->
    <modals-ask-alfred ref="modals-ask-alfred" />
  </div>
</template>

<script>
import ModalsAskAlfred from '@/components/Tickets/Modals/AskAlfred'
import OpenModalMixin from '@/mixins/OpenModalMixin'

export default {
  name: 'FirstTicket',

  components: {
    ModalsAskAlfred
  },

  mixins: [
    OpenModalMixin
  ],

  methods: {
    askAlfred () {
      this.openModal('modals-ask-alfred')
    }
  }
}
</script>

<style scoped lang="scss">
.first-ticket__image {
  padding-top: 4em;
}

.first-ticket__text {
  padding-top: 2.5em;
}

.first-ticket__button {
  padding-top: 2.5em;
}
</style>
