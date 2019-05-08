<template>
  <div class="more-options">
    <modal ref="current-modal" />

    <!-- modal contents -->
    <div
      v-if="isOpen"
      class="+hidden"
    >
      <!-- First modal -->
      <div ref="more-options-window">
        <div class="container content more-options-window">
          <div class="row center-xs">
            <div class="col-xs-12">
              <div class="more-options__title">
                More options ...
              </div>
              <div class="more-options__buttons">
                <div
                  class="button button__white-on-red button--squared button--bold"
                  @click="signOut()"
                >
                  Sign out
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
import Modal from '@/components/Modal'
import TokenHelper from '@/helpers/TokenHelper'
import PageHelper from '@/helpers/PageHelper'
import InnerModalMixin from '@/mixins/InnerModalMixin'

export default {
  name: 'ModalsMoreOptions',
  components: {
    Modal
  },

  mixins: [
    InnerModalMixin
  ],

  methods: {
    signOut () {
      TokenHelper.eraseToken()
      PageHelper.hardRedirectTo({ path: '/' })
    },

    onOpen () {
      this.currentModal().setWithContentOf(this, 'more-options-window')
    }
  }
}
</script>

<style scoped lang="scss">
.more-options__title {
  font-family: $font-alternative;
}

.more-options__buttons {
  margin-top: 1em;
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
