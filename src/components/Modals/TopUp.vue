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
              <p>Top up {{ timeEstimated }} minutes of time for only {{ selectedAmount }}.00 €</p>
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
                  @click="tryToChargeNow({})"
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
          <div class="row left-xs bottom-xs">
            <div class="col-xs-9">
              <div class="add-card-window__field">
                <h3>Card Number</h3>
                <input
                  ref="cardNumber"
                  v-model="addCardInput.cardNumber"
                  v-mask="cardType.mask"
                  type="text"
                  maxlength="19"
                  placeholder="12** *** **** 3456"
                  @keyup.enter="addCardNow()"
                >
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
                <input
                  v-model="addCardInput.expirationDate"
                  v-mask="`##/##`"
                  type="text"
                  maxlength="8"
                  placeholder="**/**"
                  @keyup.enter="addCardNow()"
                >
              </div>
            </div>
            <div class="col-xs-3">
              <div class="add-card-window__field">
                <h3>SVV/SVC</h3>
                <input
                  v-model="addCardInput.securityCode"
                  v-mask="`###`"
                  type="text"
                  maxlength="3"
                  placeholder="***"
                  @keyup.enter="addCardNow()"
                >
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
                @click="addCardNow()"
              >
                <loading-button-blue :is-loading="isAddingCardNow">
                  Get {{ timeEstimated }} minutes with Alfred now
                </loading-button-blue>
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
            :content="`Thanks for choosing Alfred`"
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
import addCard from '@/graphql/mutations/addCard'
import chargeCustomer from '@/graphql/mutations/chargeCustomer'
import ModalsContentsSuccess from '@/components/Modals/Contents/Success'
import { required } from 'vuelidate/lib/validators'
import CardsHelper from '@/helpers/CardsHelper'
import LoadingButtonBlue from '@/components/Loading/Button/Blue'

export default {
  name: 'ModalsMoreOptions',
  components: {
    ModalBody,
    ModalsContentsSuccess,
    LoadingButtonBlue
  },

  mixins: [
    InnerModalMixin,
    CurrentIdentityMixin
  ],

  validations: {
    addCardInput: {
      cardNumber: { required },
      expirationDate: { required },
      securityCode: { required }
    }
  },

  props: {
  },

  data () {
    return {
      selectedAmount: 10,
      isChargingNow: false,
      isAddingCardNow: false,
      addCardInput: {
        cardNumber: '',
        expirationDate: '',
        securityCode: ''
      }
    }
  },

  computed: {
    timeEstimated () {
      return 4 * this.selectedAmount
    },

    cardType () {
      return CardsHelper.cardTypeFrom(this.addCardInput.cardNumber)
    }
  },

  created () {
    this.notices = new NoticesService(this)
  },

  methods: {
    async addCardNow () {
      this.$v.addCardInput.$touch()
      if (this.$v.addCardInput.$error) return
      if (this.isAddingCardNow) return

      this.isAddingCardNow = true
      window.Stripe.setPublishableKey(process.env.VUE_APP_STRIPE_PUBLISHABLE_KEY)

      const number = this.addCardInput.cardNumber.replace(/\s/g, '')
      const cvc = this.addCardInput.securityCode
      const expMonth = this.addCardInput.expirationDate.split('/')[0]
      const expYear = this.addCardInput.expirationDate.split('/')[1]

      window.Stripe.card.createToken({
        number: number,
        cvc: cvc,
        exp_month: expMonth,
        exp_year: expYear
      }, async (status, response) => {
        if (response.error) {
          this.isAddingCardNow = false
          return this.notices.error('Your card does not seem to be valid. Please try again.')
        }

        const addCardInput = { cardToken: response.id }

        try {
          await addCard(this, addCardInput)
          await this.tryToChargeNow({ skipValidation: true })
        } catch (error) {
          this.notices.graphError(error)
        }
        this.isAddingCardNow = false
      })
    },

    async tryToChargeNow ({ skipValidation }) {
      if (!skipValidation) {
        if (!this.currentIdentity.stripeCardId) return this.goToAddCard()
      }

      if (this.isChargingNow) return

      try {
        this.isChargingNow = true
        const chargeCustomerInput = {
          amount: this.selectedAmount
        }
        await chargeCustomer(this, chargeCustomerInput)
        this.currentModal().setWithContentOf(this, 'payment-success-window')
      } catch (error) {
        this.notices.graphError(error)
      }
      this.isChargingNow = false
    },

    goToAddCard () {
      this.currentModal().setWithContentOf(this, 'add-card-window')
      this.$nextTick(() => {
        this.$refs.cardNumber.focus()
      })
    },

    setAmount (newAmount) {
      this.selectedAmount = newAmount
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
  input {
    letter-spacing: 0.5px;
    width: 100%;
    font-size: 24px;
    padding-bottom: 0.5em;
    padding-top: 0.5em;
    border: none;
    border-bottom: 1px solid $color-grey;
    &::placeholder {
      color: $color-grey;
    }
  }
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

.add-card-window__field {
  padding-top: 0.6em;
  padding-bottom: 0.6em;
}

.top-up-window {
  p {
    font-size: 22px;
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
