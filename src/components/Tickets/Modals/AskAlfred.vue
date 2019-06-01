<template>
  <div class="ask-alfred">
    <modal-body ref="current-modal" />

    <!-- modal contents -->
    <div
      v-if="isOpen"
      class="+hidden"
    >
      <!-- First modal -->
      <div ref="ask-alfred-window">
        <div class="container content ask-alfred-window">
          <div class="row center-xs">
            <div class="col-xs-12">
              <div class="request">
                <textarea
                  ref="request"
                  v-model="createTicketInput.subject"
                  name="message"
                  :placeholder="placeholder"
                />

                <div class="request__button">
                  <div class="row center-xs">
                    <div
                      class="col-xs-12 +extend-clickable +pointer"
                      @click="askNow()"
                    >
                      <div v-if="isAskingNow">
                        <div class="button button__blue-on-white button--bold">
                          <loading-button
                            :color="`white`"
                            :size="28"
                          />
                        </div>
                      </div>
                      <div v-else>
                        <div class="button button__blue-on-white button--large button--bold">
                          Ask alfred
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Success -->
      <div ref="no-worry">
        <div class="content">
          <modals-contents-success
            :title="`No worry!`"
            :content="`Alfred will take care of this`"
            :action="close"
          />
        </div>
      </div>

      <!-- Error topup -->
      <div ref="please-topup">
        <div class="content">
          <modals-contents-locked
            :title="`Oops`"
            :content="`You don't have much time left with Alfred, to make new requests, please add some credit!`"
            :button-label="`Top up now`"
            :action="topUpNow"
          />
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
import ModalBody from '@/components/ModalBody'
import InnerModalMixin from '@/mixins/InnerModalMixin'
import ModalsContentsSuccess from '@/components/Modals/Contents/Success'
import ModalsContentsLocked from '@/components/Modals/Contents/Locked'
import TextareaHelper from '@/helpers/TextareaHelper'
import createTicket from '@/graphql/mutations/createTicket'
import NoticesService from '@/services/NoticesService'
import { required } from 'vuelidate/lib/validators'
import ErrorsHelper from '@/helpers/ErrorsHelper'
import LoadingButton from '@/components/Loading/Button'
import OpenModalMixin from '@/mixins/OpenModalMixin'
import ModalsTopUp from '@/components/Modals/TopUp'
import TrackingHelper from '@/helpers/TrackingHelper'

export default {
  name: 'ModalsAskAlfred',
  components: {
    ModalBody,
    ModalsContentsSuccess,
    ModalsContentsLocked,
    LoadingButton,
    ModalsTopUp
  },
  mixins: [
    InnerModalMixin,
    OpenModalMixin
  ],

  props: {
  },

  validations: {
    createTicketInput: {
      subject: { required }
    }
  },

  data () {
    return {
      isAskingNow: false,
      createTicketInput: {
        subject: ''
      },
      placeholder: 'Write your request here\r\n\r\nAdd as much details as possible.\r\n\r\nNo worry though, If I need more informations, I’ll come back to you before to start.'
    }
  },

  created () {
    this.notices = new NoticesService(this)
  },

  methods: {
    onOpen () {
      this.currentModal().setWithContentOf(this, 'ask-alfred-window')
      TextareaHelper.autosize()
    },

    afterOpen () {
      this.$refs.request.focus()
    },

    topUpNow () {
      // we don't close the current modal we just hide it
      // if this makes issues on the system we should change it
      this.currentModal().hide()
      this.openModal('modals-top-up')
    },

    async askNow () {
      this.$v.createTicketInput.$touch()
      if (this.$v.createTicketInput.$error) return
      if (this.isAskingNow) return

      this.isAskingNow = true

      try {
        await createTicket(this, this.createTicketInput)
        TrackingHelper.sentFirstRequest(this)
        this.currentModal().setWithContentOf(this, 'no-worry')
        this.createTicketInput.subject = ''
      } catch (error) {
        if (ErrorsHelper.fromType(error, 'credits_issue')) {
          this.isAskingNow = false
          return this.currentModal().setWithContentOf(this, 'please-topup')
        }
        this.notices.graphError(error)
      }
      this.isAskingNow = false
    }
  }
}
</script>

<style scoped lang="scss">
.request__button {
  width: 100%;
  position: absolute;
  bottom: -5em;
  margin: auto;
}
.request {
  position: relative;
  max-height: 70vh;
  textarea {
    max-height: 70vh;
    height: 10em;
    border-radius: 2px;
    font-size: 18px;
    padding: 0.8em;
    width: 100%;
    border: 0px;
    &::placeholder {
      color: $color-grey;
    }
    &:disabled {
      background-color: $color-disabled-input;
    }
  }
}
.content {
  @include breakpoint("lg") {
    width: 40vw;
  }
  @include breakpoint("md") {
    width: 50vw;
  }
  @include breakpoint("sm") {
    width: 60vw;
  }
  @include breakpoint("xs") {
    width: 80vw;
  }
}
</style>
