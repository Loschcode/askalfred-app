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
                  v-model="createTicketInput.message"
                  name="message"
                  :placeholder="placeholder"
                />

                <div class="request__button">
                  <div class="row center-xs">
                    <div class="col-xs-12">
                      <div
                        class="button button__blue-on-white button--large button--bold"
                        @click="askNow()"
                      >
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

      <!-- Success -->
      <div ref="no-worry">
        <div class="content">
          <modals-common-success
            :title="`No worry!`"
            :content="`Alfred will take care of this`"
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
import ModalsCommonSuccess from '@/components/Modals/Success'
import autosize from 'autosize'
import createTicket from '@/graphql/mutations/createTicket'
import EventsService from '@/services/EventsService'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'ModalsAskAlfred',
  components: {
    ModalBody,
    ModalsCommonSuccess
  },
  mixins: [
    InnerModalMixin
  ],

  props: {
  },

  validations: {
    createTicketInput: {
      message: { required }
    }
  },

  data () {
    return {
      createTicketInput: {
        message: ''
      },
      placeholder: 'Write your request here\r\n\r\nAdd as much details as possible.\r\n\r\nNo worry though, If I need more informations, I’ll come back to you before to start.'
    }
  },

  created () {
    this.events = new EventsService(this)
  },

  methods: {
    onOpen () {
      this.currentModal().setWithContentOf(this, 'ask-alfred-window')
      autosize(document.querySelectorAll('textarea'))
    },

    afterOpen () {
      this.$refs.request.focus()
    },

    async askNow () {
      this.$v.createTicketInput.$touch()
      if (this.$v.createTicketInput.$error) return

      try {
        await createTicket(this, this.createTicketInput)
        this.currentModal().setWithContentOf(this, 'no-worry')
      } catch (error) {
        this.events.graphError(error)
      }
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
  textarea {
    height: 10em;
    border-radius: 2px;
    font-size: 18px;
    padding: 0.8em;
    width: 100%;
    border: 0px;
    &::placeholder {
      color: $color-grey; // $color-light-grey-blueish;
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
