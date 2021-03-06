<template>
  <div
    class="ticket +pointer"
    @click="goToItem(ticket.id)"
  >
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
          <div :class="`ticket__title-head ticket__title-head--${ticket.status}`">
            <span v-if="ticket.title">
              {{ ticket.title }}
            </span>
            <span v-else>
              New request
            </span> <span :class="`ticket__title-tag ticket__title-tag--${ticket.status}`">
              <span v-if="ticket.status === 'opened'">
                Waiting list
              </span>
              <span v-else-if="ticket.status === 'processing'">
                I'm on it!
              </span>
              <span v-else-if="ticket.status === 'completed'">
                Thanks!
              </span>
              <span v-else-if="ticket.status === 'canceled'">
                Closed
              </span>
            </span>
          </div>
          <div class="ticket__title-excerpt">
            <div
              class="markdown__sanitize"
              v-html="withMarkDown(excerpt())"
            />
          </div>
        </div>
      </div>
      <div class="col-xs-2 +no-padding">
        <div
          v-if="wasSeenAt() || !wasAnswered()"
          class="ticket__date"
        >
          {{ wasAnsweredAt() || postedOn() }}
        </div>
        <div
          v-else
          class="ticket__notif"
        >
          <img src="/images/tickets/list/was_seen.svg">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from '@/router'
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'
import TimeHelper from '@/helpers/TimeHelper'
import MarkDownHelper from '@/helpers/MarkDownHelper'

export default {
  name: 'TicketsListItem',
  components: {
  },

  mixins: [
    CurrentIdentityMixin
  ],
  props: {
    ticket: {
      default: function () {},
      type: Object
    }
  },

  methods: {
    withMarkDown (string) {
      return MarkDownHelper.abstractOf(string)
    },

    wasAnswered () {
      return this.ticket.lastEventFromAlfred !== null
    },

    wasSeenAt () {
      if (this.wasAnswered()) {
        return this.ticket.lastEventFromAlfred.seenAt
      }
    },

    excerpt () {
      // what a piece of crap condition chain
      // I know, no time, you know.
      if (this.ticket.lastEventFromAlfred) {
        if (this.ticket.lastEventFromAlfred.eventable) {
          if (this.ticket.lastEventFromAlfred.eventable.body) {
            return this.ticket.lastEventFromAlfred.eventable.body
          }
        }
      }

      if (this.ticket.subject) return this.ticket.subject
    },

    wasAnsweredAt () {
      if (this.wasAnswered()) {
        return TimeHelper.ago(this.ticket.lastEventFromAlfred.createdAt)
      }
    },

    postedOn () {
      return TimeHelper.ago(this.ticket.createdAt)
    },

    goToItem (ticketId) {
      router.push({ path: `/tickets/chat/${ticketId}` })
    }
  }
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
  color: $color-dark-grey;
}

.ticket__title-head--opened {
}

.ticket__title-tag {
  text-transform: uppercase;
  font-size: 11px;
}

.ticket__title-tag--opened {
  color: $color-mid-dark-grey;
}
.ticket__title-tag--processing {
  color: $color-blue;
}
.ticket__title-tag--completed {
  color: $color-green;
}
.ticket__title-tag--canceled {
  color: $color-red;
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
  text-align: center;
}

.ticket__notif {
  text-align: center;
  img {
    height: 40px;
  }
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
