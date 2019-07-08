<template>
  <div class="top-up">
    <modal-body ref="current-modal" />

    <!-- modal contents -->
    <div
      v-if="isOpen"
      class="+hidden"
    >
      <!-- First modal -->
      <div ref="top-up-window">
        <div class="container content top-up-window">
          <div class="row center-xs">
            <div class="col-xs-8">
              <p class="top-up-window__top-up-for">
                Top up {{ timeEstimated }} minutes of time for only {{ selectedAmount }}.00 €
              </p>
            </div>
          </div>
          <div class="row center-xs">
            <div class="col-xs-10">
              <p
                v-if="requestsEstimated > 5"
                class="top-up-window__requests-on-average"
              >
                It's more than {{ requestsEstimated }} requests on average!
              </p>
            </div>
          </div>
          <div class="top-up-window__buttons">
            <div class="row center-xs">
              <div
                class="col-xs-5 top-up-window__button-container +pointer"
                @click="setAmount(5)"
              >
                <div
                  class="top-up-window__button"
                  :class="{ 'top-up-window__button--selected': selectedAmount === 5 }"
                >
                  5.00 €
                </div>
              </div>
              <div
                class="col-xs-5 top-up-window__button-container +pointer"
                @click="setAmount(10)"
              >
                <div
                  class="top-up-window__button"
                  :class="{ 'top-up-window__button--selected': selectedAmount === 10 }"
                >
                  10.00 €
                </div>
              </div>
            </div>
            <div class="row center-xs">
              <div
                class="col-xs-5 top-up-window__button-container +pointer"
                @click="setAmount(15)"
              >
                <div
                  class="top-up-window__button"
                  :class="{ 'top-up-window__button--selected': selectedAmount === 15 }"
                >
                  15.00 €
                </div>
              </div>
              <div
                class="col-xs-5 top-up-window__button-container +pointer"
                @click="setAmount(20)"
              >
                <div
                  class="top-up-window__button"
                  :class="{ 'top-up-window__button--selected': selectedAmount === 20 }"
                >
                  20.00 €
                </div>
              </div>
            </div>
            <div class="row center-xs">
              <div class="col-xs-12">
                <div
                  class="top-up-window__call-to-action +pointer +extend-clickable"
                  @click="chargeExistingCard()"
                >
                  <loading-button-blue :is-loading="isChargingNow">
                    Top up
                  </loading-button-blue>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Options Locked -->
      <div ref="add-card-window">
        <div class="container content add-card-window">
          <div id="stripe-card-element" />

          <div class="row left-xs bottom-xs">
            <div class="col-xs-9">
              <div class="add-card-window__field">
                <h3>Card Number</h3>
                <div
                  id="card-number"
                  class="add-card-window__element-container"
                />
              </div>
            </div>
            <div class="col-xs-3">
              <img :src="`/images/topup/card-symbol-${cardType.type}.svg`">
            </div>
          </div>
          <div class="row left-xs bottom-xs">
            <div class="col-xs-6">
              <div class="add-card-window__field">
                <h3>Expiration Date</h3>
                <div
                  id="card-expiry"
                  class="add-card-window__element-container"
                />
              </div>
            </div>
            <div class="col-xs-3">
              <div class="add-card-window__field">
                <h3>SVV/SVC</h3>
                <div
                  id="card-cvc"
                  class="add-card-window__element-container"
                />
              </div>
            </div>
            <div class="col-xs-3">
              <img src="/images/topup/card-secret-symbol.svg">
            </div>
          </div>

          <div class="row center-xs">
            <div class="col-xs-12">
              <div
                class="add-card-window__call-to-action +pointer +extend-clickable"
                @click="addCardAndPay()"
              >
                <loading-button-blue :is-loading="isAddingCardNow">
                  Get {{ timeEstimated }} minutes with Alfred now
                </loading-button-blue>
              </div>
            </div>
          </div>
          <div class="row center-xs">
            <div class="col-xs-2">
              <div class="add-card-window__back">
                <div
                  class="button button__white-on-blue button__white-on-blue--soft"
                  @click="goBackFromCreditCard()"
                >
                  Back
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Success -->
      <div ref="payment-success-window">
        <div class="content">
          <modals-contents-success
            :title="`Payment successful!`"
            :content="`Your credit will be added shortly. Thanks for choosing Alfred`"
            :action="close"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalBody from '@/components/ModalBody'
import InnerModalMixin from '@/mixins/InnerModalMixin'
import NoticesService from '@/services/NoticesService'
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'
// import addCard from '@/graphql/mutations/addCard'
// import chargeCustomer from '@/graphql/mutations/chargeCustomer'
import setPaymentIntent from '@/graphql/mutations/setPaymentIntent'
import ModalsContentsSuccess from '@/components/Modals/Contents/Success'
import LoadingButtonBlue from '@/components/Loading/Button/Blue'
import TrackingHelper from '@/helpers/TrackingHelper'
import StripeHelper from '@/helpers/StripeHelper'

export default {
  name: 'ModalsTopUp',
  components: {
    ModalBody,
    ModalsContentsSuccess,
    LoadingButtonBlue
  },

  mixins: [
    InnerModalMixin,
    CurrentIdentityMixin
  ],

  props: {
  },

  data () {
    return {
      selectedAmount: 10,
      isChargingNow: false,
      isAddingCardNow: false,
      cardElements: {
        cardNumber: null,
        cardExpiry: null,
        cardCvc: null
      },
      paymentIntent: {
        id: null,
        clientSecret: null
      }
    }
  },

  computed: {
    requestsEstimated () {
      return this.timeEstimated / 5.0 // 7.5
    },

    timeEstimated () {
      return 3 * this.selectedAmount
    },

    cardType () {
      return {
        type: 'unknown'
      }
      // return CardsHelper.cardTypeFrom(this.cardElements.cardNumber)
    }
  },

  watch: {
    isOpen (newValue, oldValue) {
      if (newValue === false) return
      this.setAmount(10)
    }
  },

  methods: {
    clearPaymentIntent () {
      this.paymentIntent = {
        id: null,
        clientSecret: null
      }
    },

    goBackFromCreditCard () {
      this.currentModal().setWithContentOf(this, 'top-up-window')
    },

    async addCardAndPay () {
      // this.$v.cardElements.$touch()
      // if (this.$v.cardElements.$error) return
      if (this.isAddingCardNow) return

      this.isAddingCardNow = true

      if (!this.paymentIntent.clientSecret) {
        await this.setPaymentIntentWith(this.selectedAmount)
      }

      const input = {
        clientSecret: this.paymentIntent.clientSecret,
        cardNumber: this.cardElements.cardNumber,
        currentIdentity: this.currentIdentity
      }

      StripeHelper.addCardAndPay(input, async (response) => {
        if (!response) {
          this.isAddingCardNow = false
          return this.notices.error('Your card does not seem to be valid. Please try again.')
        }

        TrackingHelper.addedCard(this)

        // TODO : we should check what charging
        // with 3D secure will do here
        // and improvise depending on that

        this.clearPaymentIntent()
        TrackingHelper.paidFully(this, this.selectedAmount)
        this.currentModal().setWithContentOf(this, 'payment-success-window')
        this.isAddingCardNow = false
      })
    },

    async chargeExistingCard () {
      TrackingHelper.clickedToPay(this, this.selectedAmount)
      if (!this.currentIdentity.stripePaymentMethodId) return this.goToAddCard()
      if (this.isChargingNow) return

      this.isChargingNow = true

      if (!this.paymentIntent.clientSecret) {
        await this.setPaymentIntentWith(this.selectedAmount)
      }

      const addPaymentInput = {
        clientSecret: this.paymentIntent.clientSecret
      }
      await StripeHelper.addPayment(addPaymentInput, (response) => {
        if (!response) {
          this.isChargingNow = false
          return this.notices.error('The payment was unsuccessful. Please try again.')
        }

        this.clearPaymentIntent()
        TrackingHelper.paidFully(this, this.selectedAmount)
        this.currentModal().setWithContentOf(this, 'payment-success-window')
        this.isChargingNow = false
      })
    },

    goToAddCard () {
      this.currentModal().setWithContentOf(this, 'add-card-window')
      this.$nextTick(() => {
        StripeHelper.addElements(({ cardNumber, cardExpiry, cardCvc }) => {
          this.cardElements = { cardNumber, cardExpiry, cardCvc }
        })
      })
    },

    async setAmount (newAmount) {
      TrackingHelper.selectedPayment(this, newAmount)
      this.selectedAmount = newAmount

      await this.setPaymentIntentWith(newAmount)
    },

    async setPaymentIntentWith (amount) {
      try {
        const setPaymentIntentInput = {
          amount,
          stripePaymentIntentId: this.paymentIntent.id
        }

        const payload = await setPaymentIntent(this, setPaymentIntentInput)
        this.paymentIntent = payload
      } catch (error) {
        this.notices.graphError(error)
      }
    },

    onOpen () {
      this.currentModal().setWithContentOf(this, 'top-up-window')
    }
  }
}
</script>

<style scoped lang="scss">
.add-card-window {
  margin: 0.5em;
  font-family: $font-alternative;
  img {
    margin-bottom: 0.7em;
    max-width: 80%;
  }
  h3  {
    font-size:  18px;
    font-weight: 200;
    color: $color-grey;
  }
}

.add-card-window__element-container {
  border-bottom: 1px solid $color-light-grey;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  letter-spacing: 0.5px;
}

.add-card-window__call-to-action {
    position: absolute;
    font-weight: bold;
    left: 0;
    right: 0;
    text-align: center;
    margin: auto;
    bottom: -5em;
}

.add-card-window__back {
    position: absolute;
    font-weight: bold;
    left: 0;
    right: 0;
    text-align: center;
    margin: auto;
    bottom: -7em;
    max-width: 10em;
}

.add-card-window__field {
  padding-top: 0.6em;
  padding-bottom: 0.6em;
}

.top-up-window {
  p {
    color: $color-soft-grey;
    font-family: $font-alternative;
  }
}

.top-up-window__call-to-action {
    position: absolute;
    font-weight: bold;
    left: 0;
    right: 0;
    text-align: center;
    margin: auto;
    bottom: -5em;
}

.top-up-window__buttons {
  margin-top: 1em;
}

.top-up-window__button-container {
  padding: 0.4em;
}

.top-up-window__top-up-for {
  font-size: 22px;
}

.top-up-window__requests-on-average {
  font-weight: 600;
  font-size: 18px;
  padding-top: 0.5em;
}

.top-up-window__button {
  font-size: 24px;
  margin-bottom: 0em;
  padding: 1.2em;
  @include button-radius('small');
  text-align: center;
  background-color: $color-light-grey;
  color: $color-grey;
}

.top-up-window__button--selected {
  color: $color-white;
  background-color: $color-blue;
}

.content {
  @include breakpoint("lg") {
    width: 30vw;
  }
  @include breakpoint("md") {
    width: 40vw;
  }
  @include breakpoint("sm") {
    width: 50vw;
  }
  @include breakpoint("xs") {
    width: 80vw;
  }
}
</style>
