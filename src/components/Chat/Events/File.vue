<template>
  <div class="chat-message">
    <div v-if="isMe()">
      <div class="row end-xs">
        <div class="col-xs-11 col-md-8 ticket-file">
          <div
            class="message message__myself +no-padding-bottom +pointer"
            @click="downloadFile()"
          >
            <div class="message__myself-arrow" />
            <div class="row center-xs">
              <div class="col-xs-12">
                <div class="message__image">
                  <img src="/images/tickets/chat/illustrations/upload.svg">
                </div>
              </div>
              <div class="col-xs-12 +no-padding">
                <div class="message__bottom-cta">
                  Your file was uploaded
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="isAlfred()">
      <div class="row start-xs">
        <div class="col-xs-11 col-md-8 ticket-file">
          <div
            class="message message__yourself +no-padding-bottom +pointer"
            @click="downloadFile()"
          >
            <div class="message__yourself-arrow" />
            <div class="row center-xs">
              <div class="col-xs-12">
                <div class="message__image">
                  <img src="/images/tickets/chat/illustrations/upload.svg">
                </div>
              </div>
              <div class="col-xs-12 +no-padding">
                <div class="message__bottom-cta">
                  Click to download this file
                </div>
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
import PageHelper from '@/helpers/PageHelper'

// NOTE : file.filePath is present and usable.
export default {
  name: 'ChatEventsFile',

  components: {
  },

  mixins: [
    CurrentIdentityMixin
  ],

  props: {
    file: {
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
    // NOTE this could be improved to enforce download better
    downloadFile () {
      PageHelper.openBlank(this.file.filePath)
    },

    isMe () {
      return this.from === 'myself'
    },

    isAlfred () {
      return this.from === 'yourself'
    }
  }
}
</script>

<style scoped lang="scss">
.ticket-file {
  margin: 1em;
  margin-bottom: 0.5em;
  padding-right: 1em;
  padding-left: 1em;
}
</style>
