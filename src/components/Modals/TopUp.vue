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
              <p>Top up {{ timeEstimated }} minutes of time for only ${{ selectedAmount }}.00</p>
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
                  <div class="button button__blue-on-white button--large button--bold">
                    Top up
                  </div>
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
                  v-mask="`#### #### #### ####`"
                  type="text"
                  maxlength="19"
                  placeholder="12** *** **** 3456"
                >
              </div>
            </div>
            <div class="col-xs-3">
              <img src="/images/topup/card-symbol.svg">
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
                <div class="button button__blue-on-white button--large button--bold">
                  Get {{ timeEstimated }} minutes with Alfred now
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

export default {
  name: 'ModalsMoreOptions',
  components: {
    ModalBody,
    ModalsContentsSuccess
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
    }
  },

  created () {
    this.notices = new NoticesService(this)
  },

  methods: {
    async addCardNow () {
      this.$v.addCardInput.$touch()
      if (this.$v.addCardInput.$error) return

      try {
        await addCard(this, this.addCardInput)
        await this.tryToChargeNow({ skipValidation: true })
      } catch (error) {
        this.notices.graphError(error)
      }
    },

    async tryToChargeNow ({ skipValidation }) {
      if (!skipValidation) {
        if (!this.currentIdentity.stripeCardId) return this.goToAddCard()
      }

      try {
        const chargeCustomerInput = {
          amount: this.selectedAmount
        }
        await chargeCustomer(this, chargeCustomerInput)
        this.currentModal().setWithContentOf(this, 'payment-success-window')
      } catch (error) {
        this.notices.graphError(error)
      }
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
