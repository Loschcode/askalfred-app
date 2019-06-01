<template>
  <div class="chat-message">
    <div v-if="isMyself()">
      <div class="row end-xs">
        <div class="col-xs-11 col-md-8 ticket-message">
          <div class="message message__myself">
            <div class="message__myself-arrow" />
            <div
              class="markdown__improve"
              v-html="displayedMessage()"
            />
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="isYourself()">
      <div class="row start-xs">
        <div class="col-xs-11 col-md-8 ticket-message">
          <div class="message message__yourself">
            <div class="message__yourself-arrow" />
            <div v-html="displayedMessage()" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'
import MarkDownHelper from '@/helpers/MarkDownHelper'

export default {
  name: 'ChatEventsMessage',

  mixins: [
    CurrentIdentityMixin
  ],

  props: {
    message: {
      required: true,
      type: Object
    },
    event: {
      required: true,
      type: Object
    }
  },

  computed: {
    from () {
      if (this.event.identity.id === this.currentIdentity.id) {
        return 'myself'
      } else {
        return 'yourself'
      }
    }
  },

  methods: {
    withMarkDown (string) {
      return MarkDownHelper.fullOf(string)
    },

    displayedMessage () {
      return this.withMarkDown(this.message.body)
    },

    isMyself () {
      return this.from === 'myself'
    },

    isYourself () {
      return this.from === 'yourself'
    }
  }
}
</script>

<style scoped lang="scss">
.ticket-message {
  margin: 1em;
  margin-bottom: 0.5em;
}
</style>
