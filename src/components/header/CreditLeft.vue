<template>
  <div
    v-if="credits"
    class="credit-left +pointer"
  >
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
            {{ shownCredit() }}
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
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'
import getFullCredits from '@/graphql/queries/getFullCredits'

export default {
  name: 'CreditLeft',
  mixins: [
    CurrentIdentityMixin
  ],

  props: {
  },

  data () {
    return {
      credits: null
    }
  },

  apollo: {
    getFullCredits
  },

  computed: {
    creditSum () {
      const add = (a, b) => a + b
      return this.credits.map((credit) => credit.time).reduce(add)
    }
  },

  methods: {
    shownCredit () {
      const inMinutes = this.creditSum / 60
      if (inMinutes < 5) return 'Less than 5 minutes'
      if (inMinutes < 10) return 'Less than 10 minutes'
      if (inMinutes < 15) return 'Less than 15 minutes'
      if (inMinutes < 20) return 'Less than 20 minutes'
      if (inMinutes < 30) return 'Less than 30 minutes'
      if (inMinutes < 60) return 'Less than 1 hour'
      if (inMinutes > 60) return 'More than 1 hour'
    }
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
