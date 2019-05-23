<template>
  <div v-if="ticket">
    <div class="wrapper chat-layout">
      <div class="wrap-without-limit container-fluid header-menu">
        <div class="row">
          <div class="col-xs-12 +no-padding">
            <div class="row middle-xs">
              <div class="col-xs-6 col-md-4 col-md-offset-2">
                <div class="header-menu__text">
                  <span v-if="wasStarted()">
                    I already worked ...
                  </span>
                </div>
                <div
                  v-if="wasStarted()"
                  class="header-menu__time"
                >
                  {{ displayTimeWorked() }}
                </div>
                <div
                  v-else
                  class="header-menu__title"
                >
                  <!-- Fallback if no time was spent yet -->
                  <!-- it is a replica from the normal logo -->
                  <h1>AskAlfred</h1>
                </div>
              </div>
              <div class="col-xs-6 col-md-4">
                <credit-left />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap-without-limit container-fluid header-submenu">
        <div class="row between-xs around-md">
          <div class="col-xs-4 col-md-4 +no-padding">
            <div
              class="header-submenu__text-button +pointer"
              @click="goBack()"
            >
              Back
            </div>
          </div>

          <div class="col-xs-8 col-md-4">
            <div class="row end-xs middle-xs">
              <div class="col-xs-10">
                <div class="header-submenu__title">
                  <div v-if="ticket.title">
                    {{ ticket.title }}
                  </div>
                  <div v-else>
                    New request
                  </div>
                </div>
                <div class="header-submenu__subtitle">
                  <div v-if="wasAnswered()">
                    Last answer {{ lastAnswerDate }}
                  </div>
                  <div v-else>
                    No answer yet
                  </div>
                </div>
              </div>
              <div class="col-xs-1 +no-padding">
                <div
                  class="header-submenu__more +pointer"
                  @click="ticketOptions()"
                >
                  <img src="/images/header/submenu-more-button.svg">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="wrap container">
        <slot />
      </div>
      <!--
        This is a  computed footer placeholder linked to the autosize system
        It allows us to make space in between the textarea and the real bottom
        of the Chat
      -->
      <div
        :style="{ 'margin-top': computedFooterPlaceholder }"
      />
    </div>

    <div class="footer">
      <div class="wrap container">
        <div class="row">
          <div class="col-xs-12">
            <div class="message-input">
              <div v-if="isLocked()">
                <textarea
                  name="message"
                  placeholder="This request was closed"
                  disabled
                />
              </div>
              <div v-else>
                <textarea
                  v-model="currentMessage"
                  name="message"
                  placeholder="Write a reply..."
                />
              </div>

              <div class="message-input__button">
                <div v-if="currentMessage">
                  <div
                    class="message-input__button-send +pointer"
                    @click="sendMessage()"
                  >
                    <div class="+extend-clickable">
                      Send
                    </div>
                  </div>
                </div>
                <div v-else>
                  <div
                    class="message-input__button-join-file +pointer"
                  >
                    <label for="file">
                      <div class="+extend-clickable +pointer">
                        <input
                          v-if="!isLocked()"
                          id="file"
                          ref="file"
                          class="+hidden"
                          type="file"
                          @change="sendFile()"
                        >
                        <img src="/images/tickets/chat/join-file.svg">
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Modals -->
    <modals-ticket-options
      ref="modals-ticket-options"
      :ticket="ticket"
    />
  </div>
</template>

<script>
import ChatMixin from '@/mixins/ChatMixin'
import CreditLeft from '@/components/Header/CreditLeft'
import autosize from 'autosize'
import router from '@/router'
import ModalsTicketOptions from '@/components/Layouts/ChatLayout/Modals/TicketOptions'
import OpenModalMixin from '@/mixins/OpenModalMixin'
import sendMessage from '@/graphql/mutations/sendMessage'
import sendFile from '@/graphql/mutations/sendFile'
import ScrollHelper from '@/helpers/ScrollHelper'
import moment from 'moment'
import { required } from 'vuelidate/lib/validators'
import NoticesService from '@/services/NoticesService'
import getFullCredits from '@/graphql/queries/getFullCredits'

export default {
  name: 'ChatLayout',
  components: {
    CreditLeft,
    ModalsTicketOptions
  },

  mixins: [
    ChatMixin,
    OpenModalMixin
  ],

  apollo: {
    getFullCredits
  },

  props: {
  },

  validations: {
    currentMessage: { required }
  },

  data () {
    return {
      credits: null,
      currentMessage: '',
      footerPlaceholder: 100
    }
  },

  computed: {
    ticketCredits () {
      return this.credits.filter((credit) => credit.ticketId === this.ticket.id)
    },

    totalCredits () {
      return this.ticketCredits.map((credit) => credit.time)
    },

    creditSpent () {
      if (this.totalCredits.length === 0) return 0
      const negativeWorkBalance = this.totalCredits.reduce((sum, time) => sum + time)
      return Math.abs(negativeWorkBalance)
    },

    lastAnswerDate () {
      const date = this.lastAnswer().createdAt
      return moment(date).fromNow()
    },

    computedFooterPlaceholder () {
      return `${this.footerPlaceholder}px`
    }
  },

  watch: {
    /**
     * when footer placeholder changes value
     * it means we should go to the bottom
     */
    footerPlaceholder (newValue, oldValue) {
      ScrollHelper.toBottom()
    },

    // when we load the ticket we can
    // load manual selectors as well
    ticket (newValue, oldValue) {
      if (newValue) {
        /**
         * This is a system to go to bottom when new messages or events appear
         */
        this.$nextTick(() => {
          // we don't go down on page load
          if (oldValue !== null) {
            // we don't go down if there's no event added / changed
            if (newValue.eventsConnection.nodes.length !== oldValue.eventsConnection.nodes.length) {
              ScrollHelper.toBottom()
            }
          }
        })

        /**
         * This is a very complicated system which should be refactored and abstracted
         * It checks when the autosize works and will adapt the style of
         * footerPlaceholder which will be sent to computedFooterPlaceholder
         * Which will change the computed vue styling automatically
         * Then it also goes to the bottom by scrolling to make it clean.
         */
        this.$nextTick(() => {
          const select = document.querySelector('textarea')
          const baseMargin = 70
          autosize(select)

          select.addEventListener('autosize:resized', () => {
            this.footerPlaceholder = select.clientHeight + baseMargin
          })
        })
      }
    }
  },

  mounted () {
  },

  created () {
    this.notices = new NoticesService(this)
  },

  methods: {
    wasStarted () {
      return this.creditSpent > 0
    },

    displayTimeWorked () {
      const worked = this.creditSpent
      let format = null

      if (worked <= 59) {
        format = 'ss\\s\\e\\c'
      } else if (worked <= 59 * 60) {
        format = 'mm\\m\\i\\n ss\\s\\e\\c'
      } else if (worked <= 59 * 60 * 24) {
        format = 'HH\\h mm\\m\\i\\n ss\\s\\e\\c'
      } else {
        format = 'D\\d HH\\h mm\\m ss\\s\\e\\c'
      }

      const endWorked = worked * 1000

      return moment.utc(moment.duration(endWorked).asMilliseconds()).format(format)
    },

    isLocked () {
      return this.ticket.status === 'canceled' || this.ticket.status === 'completed'
    },

    async sendFile () {
      try {
        const selectedFile = this.$refs.file.files[0]
        const sendFileInput = { id: this.ticket.id, file: selectedFile }
        await sendFile(this, sendFileInput)
        this.currentMessage = ''
      } catch (error) {
        this.notices.graphError(error)
      }
    },

    async sendMessage () {
      this.$v.currentMessage.$touch()
      if (this.$v.currentMessage.$error) return

      try {
        const sendMessageInput = { id: this.ticket.id, message: this.currentMessage }
        await sendMessage(this, sendMessageInput)
        this.currentMessage = ''
      } catch (error) {
        this.notices.graphError(error)
      }
    },

    ticketOptions () {
      this.openModal('modals-ticket-options')
    },

    goBack () {
      router.go(-1) || router.push({ path: '/tickets/list' })
    }
  }
}
</script>

<style scoped lang="scss">
.chat-layout {
}

// .footer-placeholder {
//   margin-top: 6em;
// }

.footer {
  background-color: $color-very-light-grey;
  margin-top: 0;
  position: fixed;
  bottom: 0;
  width: 100%;
}

.message-input {
  position: relative;
  padding: 1em;

  textarea {
    height: 3em;
    // to limit the autosize feature
    max-height: 400px;
    border-radius: 2px;
    font-size: 16px;
    padding: 0.8em;
    padding-right: 3.5em;
    width: 100%;
    border: 1px solid $color-light-grey-blueish;
    &::placeholder {
      color: $color-light-grey-blueish;
    }
    &:disabled {
      background-color: $color-disabled-input;
    }
  }
}

.message-input__button-send {
  position: absolute;
  width: 1.5em;
  top: 2em;
  right: 3em;
  text-transform: uppercase;
}

.message-input__button-join-file {
  position: absolute;
  width: 1.3em;
  top: 1.9em;
  right: 2em;
}
</style>
