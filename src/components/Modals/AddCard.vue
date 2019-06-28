<template>
  <div class="add-card">
    <modal-body ref="current-modal" />

    <!-- modal contents -->
    <div
      v-if="isOpen"
      class="+hidden"
    >
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
                  Save card
                </loading-button-blue>
              </div>
            </div>
          </div>
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
import { required } from 'vuelidate/lib/validators'
import CardsHelper from '@/helpers/CardsHelper'
import LoadingButtonBlue from '@/components/Loading/Button/Blue'
import TrackingHelper from '@/helpers/TrackingHelper'
import StripeHelper from '@/helpers/StripeHelper'

export default {
  name: 'ModalsAddCard',
  components: {
    ModalBody,
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
    requestsEstimated () {
      return this.timeEstimated / 5.0 // 7.5
    },

    timeEstimated () {
      return 3 * this.selectedAmount
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

      StripeHelper.addCard(this.addCardInput, async (cardToken) => {
        if (!cardToken) {
          this.isAddingCardNow = false
          return this.notices.error('Your card does not seem to be valid. Please try again.')
        }

        const addCardInput = { cardToken }

        try {
          await addCard(this, addCardInput)
          TrackingHelper.addedCard(this)
          this.currentModal().close()
          this.notices.success('Your card has been added. You can now allow new expenses and top-up your account.')
        } catch (error) {
          this.notices.graphError(error)
        }
        this.isAddingCardNow = false
      })
    },

    onOpen () {
      this.currentModal().setWithContentOf(this, 'add-card-window')
      this.$nextTick(() => {
        this.$refs.cardNumber.focus()
      })
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
