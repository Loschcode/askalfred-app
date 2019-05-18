<template>
  <div class="row center-xs">
    <div class="col-xs-12">
      <div class="ticket-subject">
        <div class="message message__subject">
          <div class="message__subject-arrow" />
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'ChatSubject'
}
</script>

<style scoped lang="scss">
.ticket-subject {
  margin: 1em;
  margin-top: 2em;
}

.ticket-subject__content {
}
</style>
