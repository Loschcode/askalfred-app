<template>
  <div class="ticket-file">
    <div class="row center-xs">
      <div class="col-xs-11 col-md-8">
        <chat-notice :status="`up`">
          <p v-if="event.seenAt">
            I've seen your file.
          </p>
          <p v-else>
            I received your file and will review it soon.
          </p>
          <a
            target="_blank"
            :href="file.filePath"
          >Click here to download it</a>
        </chat-notice>
      </div>
    </div>
  </div>
</template>

<script>
import CurrentIdentityMixin from '@/mixins/CurrentIdentityMixin'
import ChatNotice from '@/components/Chat/Notice'

// NOTE : file.filePath is present and usable.
export default {
  name: 'ChatFile',

  components: {
    ChatNotice
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
.ticket-file {
  margin: 1em;

  p {
    font-size: 14px;
    padding-bottom: 0.5em;
  }

  a {
    color: $color-blue;
    padding-bottom: 0.2em;
    border-bottom: 1px solid $color-blue;
  }
}
</style>
