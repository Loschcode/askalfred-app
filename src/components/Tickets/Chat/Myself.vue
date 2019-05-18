<template>
  <div class="row end-xs">
    <div class="col-xs-11 ticket-message">
      <div class="message message__myself">
        <div class="message__myself-arrow" />
        <slot />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChatMyself'
}
</script>

<style scoped lang="scss">
.ticket-message {
  margin: 1em;
  margin-bottom: 0.5em;
}
</style>
