<template>
  <!--  Notice -->
  <div class="row center-xs">
    <div class="col-xs-8">
      <div class="ticket-notice">
        <div class="ticket-notice__message">
          <slot />
        </div>
        <div class="ticket-notice__symbol">
          <span class="ticket-notice__symbol-border" />
          <span class="ticket-notice__symbol-image"><img :src="`/images/tickets/chat/icons/${status}.svg`"></span>
          <span class="ticket-notice__symbol-border" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'FirstTicket',
  props: {
    status: {
      required: true,
      type: String
    }
  }
}
</script>

<style scoped lang="scss">
.ticket-notice__message {
  line-height: 1.2em;
  font-size: 14px;
}

.ticket-notice__symbol {
  padding-top: 1em;
}

.ticket-notice__symbol-image {
  width: 5%;
  padding: 1em;
  img {
    height: 20px;
  }
}

.ticket-notice__symbol-border {
  display: inline-block;
  vertical-align: middle;
  height: 5px;
  width: 35%;
  border-top: 1px solid $color-light-grey;
}
</style>
