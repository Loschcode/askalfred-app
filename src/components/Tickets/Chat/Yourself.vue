<template>
  <div class="row start-xs">
    <div class="col-xs-11 ticket-message">
      <div class="message message__yourself">
        <div class="message__yourself-arrow" />
        <slot />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChatYourself'
}
</script>

<style scoped lang="scss">
.ticket-message {
  margin: 1em;
  margin-bottom: 0.5em;
}
</style>
