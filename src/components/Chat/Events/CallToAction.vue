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
              <div
                class="col-xs-12 +no-padding +pointer"
                @click="clickButton()"
              >
                <div
                  class="message__bottom-cta"
                  v-html="displayedLabel()"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'
import MarkDownHelper from '@/helpers/MarkDownHelper'
import PageHelper from '@/helpers/PageHelper'

export default {
  name: 'ChatEventsCallToAction',

  mixins: [
    CurrentIdentityMixin
  ],

  props: {
    callToAction: {
      required: true,
      type: Object
    },
    event: {
      required: true,
      type: Object
    }
  },

  computed: {
    from () {
      if (this.event.identity.id === this.currentIdentity.id) {
        return 'myself'
      } else {
        return 'yourself'
      }
    }
  },

  methods: {
    withMarkDown (string) {
      return MarkDownHelper.fullOf(string)
    },

    clickButton () {
      PageHelper.openBlank(this.callToAction.link)
    },

    displayedLabel () {
      return this.withMarkDown(this.callToAction.label)
    },

    displayedBody () {
      return this.withMarkDown(this.callToAction.body)
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
.ticket-action {
  margin: 1em;
  margin-bottom: 0.5em;
  padding-right: 1em;
  padding-left: 1em;
}
</style>
