<template>
  <div class="ticket +pointer">
    <div class="row start-xs">
      <div class="col-xs-3 +no-padding">
        <div class="row middle-xs">
          <div class="col-xs-12">
            <div class="ticket__icon">
              <img :src="`/images/tickets/list/icons/${ticket.status}.svg`">
            </div>
          </div>
        </div>
      </div>
      <div class="col-xs-7 +no-padding">
        <div class="ticket__title">
          <div class="ticket__title-head ticket__title-head--wait">
            <span v-if="ticket.title">
              {{ ticket.title }}
            </span>
            <span v-else>
              New request
            </span> <span class="ticket__title-tag ticket__title-tag--wait">Waiting list</span>
          </div>
          <div class="ticket__title-excerpt">
            {{ ticket.messages[0].body }}
          </div>
        </div>
      </div>
      <div class="col-xs-2 +no-padding">
        <div class="ticket__date">
          1d ago
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'

export default {
  name: 'TicketsList',
  components: {
  },

  mixins: [
    CurrentIdentityMixin
  ],
  props: [
    'ticket'
  ]
}
</script>

<style scoped lang="scss">

.ticket__icon {
  padding-top: 0.3em;
  text-align: center;
  img {
    width: 3em;
  }
}

.ticket__title {

}

.ticket__title-head {
}

.ticket__title-head--wait {
  color: $color-dark-grey;
}

.ticket__title-tag {
  text-transform: uppercase;
  font-size: 11px;
}

.ticket__title-tag--wait {
  color: $color-mid-dark-grey;
}

.ticket__title-excerpt {
  padding-top: 0.5em;
  color: $color-almost-dark;
  font-size: 14px;
  line-height: 1.3em;

  // white-space: nowrap;
  // overflow: hidden;
  // text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.ticket__date {
  color: $color-dark-grey;
  font-size: 15px;
}

.ticket {
  background-color: $color-white;
  border: 1px solid $color-very-light-grey;
  padding-top: 1em;
  padding-bottom: 1em;
  padding-left: 1.5em;
  padding-right: 1.5em;
}
</style>
