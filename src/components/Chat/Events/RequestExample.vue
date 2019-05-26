<template>
  <div class="request-example">
    <!-- Action required -->
    <div class="row center-xs">
      <div class="col-xs-10">
        <div class="ticket-request">
          <div class="action">
            <div class="row center-xs">
              <div class="col-xs-10">
                <div class="action__details">
                  I need a picture of your identity card
                </div>
              </div>
            </div>
            <div class="row center-xs">
              <div class="col-xs-8">
                <div class="action__button button button__blue-on-white">
                  Send now
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  Notice -->
    <chat-notice :status="`add`">
      <!-- Nothing -->
    </chat-notice>
  </div>
</template>

<script>

export default {
  name: 'RequestExample'
}
</script>

<style scoped lang="scss">
.ticket-request {
  margin: 1em;
}

.action {
  color: $color-soft-grey;
  background-color: $color-white;
  padding: 1em;
  padding-bottom: 1em;
  @include button-radius('medium');
}

.action__details {
  padding-bottom: 1em;
}

.action__button {
  text-transform: uppercase;
  margin-bottom: -8em;
}
</style>
