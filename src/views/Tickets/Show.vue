<template>
  <div class="tickets-show">
    <!-- Subject -->
    <div class="row center-xs">
      <div class="col-xs-12">
        <div class="ticket-subject">
          <div class="message message__general">
            <div class="message__general-arrow" />
            Hi,<br>
            <br>
            I’m looking for a flight from Berlin (Germany) to San Francisco (USA) between January and February 2019.<br>
            I already checked some prices and found some for 1 300 euro but I believe there are better prices than that. Please search cheaper solutions for me. This is a link<br>
            <br>
            Thanks Alfred !<br>
          </div>
        </div>
      </div>
    </div>
    <div class="row center-xs">
      <div class="col-xs-8">
        <div class="ticket-notice">
          <div class="ticket-notice__message">
            Thanks Laurent, I will get back to you as soon as possible.
          </div>
          <div class="ticket-notice__symbol">
            <span class="ticket-notice__symbol-border" />
            <span class="ticket-notice__symbol-image"><img src="/images/tickets/will-get-back-to-you.svg"></span>
            <span class="ticket-notice__symbol-border" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketsShow'
}
</script>

<style scoped lang="scss">
.ticket-notice__message {
  line-height: 1.2em;
  font-size: 14px;
}

.ticket-notice__symbol {
  padding-top: 1em;
}

.ticket-notice__symbol-image {
  width: 5%;
  padding: 1em;
  img {
    height: 20px;
  }
}

.ticket-notice__symbol-border {
  display: inline-block;
  vertical-align: middle;
  height: 5px;
  width: 35%;
  border-top: 1px solid $color-light-grey;
}

.ticket-subject {

}

.ticket-subject__content {
  // padding: 2em;
  // text-align: left;
}

// TAKEN FROM ELSEWHERE

.message {
  position: relative;
  padding: spacing(3);
  display: flex;
  margin-top: spacing(1);
  margin-bottom: spacing(1);
  word-wrap: break-word;
  border-radius: 2px;
}

.message__general {
  color: $color-soft-grey;
  background-color: $background-message-general-color;
  border: 1px solid $border-message-myself-color;
  text-align: left;
  margin: 1em;
  margin-top: 2em;
}

.message__general-arrow {
  position: absolute;
  top: -15px;
  right: 20px;
  @include triangle-top($border-message-general-color, $background-message-general-color);

  &:after {
    top: 2px;
    right: -10px;
  }
}

.message__myself {
  color: $color-soft-grey;
  background-color: $background-message-myself-color;
  border: 1px solid $border-message-myself-color;
  text-align: right;
  float: right;
}

.message__myself-arrow {
  position: absolute;
  right: -18px;
  top: 32%;
  @include triangle-right($border-message-myself-color, $background-message-myself-color);

  &:after {
    top: -10px;
    right: 0px;
  }
}

.message__yourself {
  background-color: $background-message-yourself-color;
  border: 1px solid $border-message-yourself-color;
  text-align: left;
  float: left;
}

.message__yourself-arrow {
  position: absolute;
  left: -18px;
  top: 32%;
  @include triangle-left($border-message-yourself-color, $background-message-yourself-color);

  &:after {
    top: -10px;
    left: 0px;
  }
}

</style>
