<template>
  <div class="chat-message">
    <div v-if="isMyself()">
      <!-- You aren't supposed to be able to do it -->
    </div>
    <div v-else-if="isYourself()">
      <div class="row start-xs">
        <div class="col-xs-11 col-md-8 ticket-action">
          <div class="message message__yourself +no-padding-bottom">
            <div class="message__yourself-arrow" />
            <div class="row center-xs">
              <div class="col-xs-12">
                <div
                  class="message__call-to-action--body"
                  v-html="displayedBody()"
                />
              </div>
              <div class="col-xs-12">
                <div v-for="lineItem in paymentAuthorization.lineItems">
                  <div class="row start-xs line-item">
                    <div class="col-xs-8 line-item__label">
                      {{ lineItem.label }}
                    </div>
                    <div class="col-xs-4 line-item__price">
                      <div class="row end-xs">
                        <div class="col-xs-12">
                          {{ lineItem.amountInCents / 100 }} €
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-xs-12 +no-padding">
                      <hr class="line-item__delimiter">
                    </div>
                  </div>
                </div>
                <div class="row start-xs line-item">
                  <div class="col-xs-8 line-item__label line-item__label--fees">
                    Credit card fees *
                  </div>
                  <div class="col-xs-4 line-item__price">
                    <div class="row end-xs">
                      <div class="col-xs-12">
                        {{ displayedFees() }} €
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="paymentAuthorization.authorizedAt"
                class="col-xs-12 +no-padding"
              >
                <div class="message__bottom-approved">
                  You approved <strong>{{ displayedTotal() }} €</strong>
                </div>
              </div>
              <div
                v-else
                class="col-xs-12 +no-padding +pointer"
                @click="clickButton()"
              >
                <div class="message__bottom-cta">
                  <loading-button-lambda :is-loading="isAllowingExpense">
                    Allow expense of <strong>{{ displayedTotal() }} €</strong>
                  </loading-button-lambda>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-11 col-md-8">
          <div class="message__comment">
            * My payment processor (Stripe) charges me a fee for using your credit card
          </div>
        </div>
      </div>
    </div>
    <!-- Modals -->
    <modals-add-card
      ref="modals-add-card"
    />
  </div>
</template>

<script>
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'
import MarkDownHelper from '@/helpers/MarkDownHelper'
import ModalsAddCard from '@/components/Modals/AddCard'
import OpenModalMixin from '@/mixins/OpenModalMixin'
import allowExpense from '@/graphql/mutations/allowExpense'
import NoticesService from '@/services/NoticesService'
import LoadingButtonLambda from '@/components/Loading/Button/Lambda'

export default {
  name: 'ChatEventsPaymentAuthorization',

  components: {
    ModalsAddCard,
    LoadingButtonLambda
  },

  mixins: [
    CurrentIdentityMixin,
    OpenModalMixin
  ],

  props: {
    paymentAuthorization: {
      required: true,
      type: Object
    },
    event: {
      required: true,
      type: Object
    }
  },

  data () {
    return {
      isAllowingExpense: false
    }
  },

  computed: {
    from () {
      if (this.event.identity.id === this.currentIdentity.id) {
        return 'myself'
      } else {
        return 'yourself'
      }
    },

    totalAmount () {
      return this.paymentAuthorization.amountInCents + this.paymentAuthorization.feesInCents
    }
  },

  created () {
    this.notices = new NoticesService(this)
  },

  methods: {
    withMarkDown (string) {
      return MarkDownHelper.fullOf(string)
    },

    clickButton () {
      if (this.currentIdentity.stripeCardId) {
        this.allowExpense()
      } else {
        this.addCard()
      }
    },

    async allowExpense () {
      if (this.isAllowingExpense) return
      this.isAllowingExpense = true

      try {
        const allowExpenseInput = { eventId: this.event.id }
        await allowExpense(this, allowExpenseInput)
        this.notices.success('This expense was allowed.')
        // NOTE : we don't isAllowingExpense = false because
        // it'll hot reload the button entirely in this specific case
      } catch (error) {
        this.notices.graphError(error)
        this.isAllowingExpense = false
      }
    },

    addCard () {
      this.openModal('modals-add-card')
    },

    displayedTotal () {
      return this.totalAmount / 100
    },

    displayedAmount () {
      return this.paymentAuthorization.amountInCents / 100
    },

    displayedFees () {
      return this.paymentAuthorization.feesInCents / 100
    },

    displayedBody () {
      return this.withMarkDown(this.paymentAuthorization.body)
    },

    isMyself () {
      return this.from === 'myself'
    },

    isYourself () {
      return this.from === 'yourself'
    }
  }
}
</script>

<style scoped lang="scss">
.line-item__delimiter {
  border: none;
  border-bottom: 1px solid $color-light-grey;
  margin: 0.2em;
  padding-right: 1em;
  padding-left: 1em;
}

.line-item {
  margin: 1em;
  margin-bottom: 1em;
  margin-top: 0.5em;
  font-size: 20px;
}

.line-item__price {

}

.line-item__label {

}

.line-item__label--fees {
  font-style: italic;
}

.ticket-action {
  margin: 1em;
  margin-bottom: 0.5em;
  padding-right: 1em;
  padding-left: 1em;
}
</style>
