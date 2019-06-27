<template>
  <div class="chat-message">
    <div v-if="isMyself()">
      <!-- You aren't supposed to be able to do it -->
    </div>
    <div v-else-if="isYourself()">
      <div class="row start-xs">
        <div class="col-xs-11 col-md-6 ticket-action">
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
                <div
                  v-for="dataCollection in dataCollectionForm.dataCollections"
                  :key="dataCollection.id"
                >
                  <div class="row start-xs data-collection">
                    <div class="col-xs-12">
                      <div class="data-collection__item">
                        <span class="data-collection__label">
                          {{ dataCollection.label }}
                        </span>

                        <span class="data-collection__input">
                          <input
                            type="text"
                            :value="dataCollection.value"
                          >
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                v-if="dataCollectionForm.authorizedAt"
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
                  <loading-button-lambda :is-loading="isSendingDataCollection">
                    Confirm my informations
                  </loading-button-lambda>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-xs-11 col-md-6">
          <div class="message__comment">
            I will never ask you the same information twice. It will be safely stored in my database, and it will never be shared with anyone.
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
// import sendDataCollection from '@/graphql/mutations/sendDataCollection'
import NoticesService from '@/services/NoticesService'
import LoadingButtonLambda from '@/components/Loading/Button/Lambda'

export default {
  name: 'ChatEventsDataCollectionForm',

  components: {
    ModalsAddCard,
    LoadingButtonLambda
  },

  mixins: [
    CurrentIdentityMixin,
    OpenModalMixin
  ],

  props: {
    dataCollectionForm: {
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
      isSendingDataCollection: false
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
      return this.dataCollectionForm.amountInCents + this.dataCollectionForm.feesInCents
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
        this.sendDataCollection()
      } else {
        this.addCard()
      }
    },

    async sendDataCollection () {
      if (this.isSendingDataCollection) return
      this.isSendingDataCollection = true

      try {
        const sendDataCollectionInput = { eventId: this.event.id }
        // await sendDataCollection(this, sendDataCollectionInput)
        this.notices.success('Your informations were transmitted.')
        // NOTE : we don't isSendingDataCollection = false because
        // it'll hot reload the button entirely in this specific case
      } catch (error) {
        this.notices.graphError(error)
        this.isSendingDataCollection = false
      }
    },

    addCard () {
      this.openModal('modals-add-card')
    },

    displayedTotal () {
      return this.totalAmount / 100
    },

    displayedAmount () {
      return this.dataCollectionForm.amountInCents / 100
    },

    displayedFees () {
      return this.dataCollectionForm.feesInCents / 100
    },

    displayedBody () {
      return this.withMarkDown(this.dataCollectionForm.body)
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
.data-collection {
  margin: 1em;
  margin-bottom: 1em;
  margin-top: 0.5em;
  font-size: 18px;
}

.data-collection__item {
  display: table;
  width: 100%;
  border-spacing: 0 5px;
}

.data-collection__item * {
  display: table-cell;
}

.data-collection__label {
}

.data-collection__input {
  input {
    border: 0;
    border-bottom: 1px solid $color-light-grey;
    padding: 0.2em;
    color: $color-blue;
    font-weight: bold;
    font-size: 18px;
    width: 100%;
  }
}

.data-collection__label--fees {
  font-style: italic;
}

.ticket-action {
  margin: 1em;
  margin-bottom: 0.5em;
  padding-right: 1em;
  padding-left: 1em;
}
</style>
