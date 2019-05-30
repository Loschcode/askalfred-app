<template>
  <div>
    <div
      v-if="credits"
      class="credit-left +pointer"
      @click="topUp()"
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
              {{ displayedTime() }}
            </span>
            <span class="credit-left__content-arrow">
              <img src="/images/header/right-arrow.svg">
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- Modals -->
    <modals-top-up
      ref="modals-top-up"
    />
  </div>
</template>

<script>
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'
import getFullCredits from '@/graphql/queries/getFullCredits'
import ModalsTopUp from '@/components/Modals/TopUp'
import OpenModalMixin from '@/mixins/OpenModalMixin'
import TimeHelper from '@/helpers/TimeHelper'

export default {
  name: 'CreditLeft',

  components: {
    ModalsTopUp
  },

  mixins: [
    CurrentIdentityMixin,
    OpenModalMixin
  ],

  props: {
  },

  data () {
    return {
      credits: null,
      exactTime: false
    }
  },

  computed: {
    creditSum () {
      if (this.credits.length === 0) return 0
      const add = (a, b) => a + b
      return this.credits.map((credit) => credit.time).reduce(add)
    }
  },

  watch: {
    credits (newValue, oldValue) {
      // first time it gets set
      if (oldValue === null) {
        const timeSwitch = 30 * 1000
        setInterval(() => {
          this.exactTime = !this.exactTime
        }, timeSwitch)
      }
    }
  },

  apollo: {
    getFullCredits
  },

  methods: {
    topUp () {
      this.openModal('modals-top-up')
    },

    displayedTime () {
      if (this.exactTime) {
        return this.exactCredit()
      } else {
        return this.approxCredit()
      }
    },

    exactCredit () {
      return TimeHelper.exactDisplay(this.creditSum)
    },

    approxCredit () {
      return TimeHelper.approxDisplay(this.creditSum)
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
