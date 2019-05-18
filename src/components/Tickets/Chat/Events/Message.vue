<template>
  <div class="chat-message">
    <div v-if="isMyself()">
      <div class="row end-xs">
        <div class="col-xs-11 col-md-8 ticket-message">
          <div class="message message__myself">
            <div class="message__myself-arrow" />
            {{ message.body }}
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="isYourself()">
      <div class="row start-xs">
        <div class="col-xs-11 col-md-8 ticket-message">
          <div class="message message__yourself">
            <div class="message__yourself-arrow" />
            {{ message.body }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'

export default {
  name: 'ChatMessage',

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
