<template>
  <div class="first-ticket">
    <div class="row center-xs">
      <div class="col-xs-6">
        <div class="first-ticket__image">
          <img src="/images/tickets/show/rocket-first-ticket.svg">
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div class="first-ticket__text">
          You don’t have any request yet
        </div>
      </div>
    </div>
    <div class="row center-xs">
      <div class="col-xs-10">
        <div class="first-ticket__button">
          <div class="button button__blue-on-white">
            <a href="#">Make your first request</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FirstTicket'
}
</script>

<style scoped lang="scss">
.first-ticket__image {
  padding-top: 4em;
}

.first-ticket__text {
  padding-top: 2.5em;
}

.first-ticket__button {
  padding-top: 2.5em;
}
</style>
