<template>
  <div class="chat-message">
    <div v-if="isMyself()">
      <div class="row end-xs">
        <div class="col-xs-11 col-md-8 ticket-message">
          <div class="message message__myself">
            <div class="message__myself-arrow" />
            <slot />
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="isYourself()">
      <div class="row start-xs">
        <div class="col-xs-11 col-md-8 ticket-message">
          <div class="message message__yourself">
            <div class="message__yourself-arrow" />
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChatMessage',
  props: {
    // can be `yourself `or `myself`
    from: {
      required: true,
      type: String
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
