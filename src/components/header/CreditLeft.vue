<template>
  <div class="credit-left +pointer">
    <div class="row">
      <div class="col-xs-12">
        <div class="credit-left__title">
          Credit left
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12">
        <div class="credit-left__content">
          <span class="credit-left__content-text">
            Less than 1 hour
          </span>
          <span class="credit-left__content-arrow">
            <img src="/images/header/right-arrow.svg">
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreditLeft',
  props: {
  }
}
</script>

<style scoped lang="scss">
.credit-left {
  text-align: left;
  padding: 1em;
  background: $color-persistent-blue;
  border-radius: 8px;
}

.credit-left__title {
  opacity: 0.8;
  font-size: 20px;
  @include breakpoint("xs") {
    font-size: 14px;
  }
}

.credit-left__content {
  position: relative;
  margin-top: 0.2em;
  font-size: 22px;
}

.credit-left__content-text {
  @include breakpoint("xs") {
    font-size: 16px;
  }
}

.credit-left__content-arrow {
  position: absolute;
  right: 0;
  bottom: -3px;
  img {
    @include breakpoint("xs") {
      height: 0.8em;
    }
  }
}
</style>
