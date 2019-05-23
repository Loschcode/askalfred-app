<template>
  <div class="top-up">
    <modal-body ref="current-modal" />

    <!-- modal contents -->
    <div
      v-if="isOpen"
      class="+hidden"
    >
      <!-- First modal -->
      <div ref="top-up-window">
        <div class="container content top-up-window">
          <div class="row center-xs">
            <div class="col-xs-8">
              <p>Top up 40 minutes of time for only $10.00</p>
            </div>
          </div>
          <div class="top-up-window__buttons">
            <div class="row center-xs">
              <div class="col-xs-4 top-up-window__button-container">
                <div class="top-up-window__button">
                  $5.00
                </div>
              </div>
              <div class="col-xs-4 top-up-window__button-container">
                <div class="top-up-window__button">
                  $10.00
                </div>
              </div>
            </div>
            <div class="row center-xs">
              <div class="col-xs-4 top-up-window__button-container">
                <div class="top-up-window__button">
                  $15.00
                </div>
              </div>
              <div class="col-xs-4 top-up-window__button-container">
                <div class="top-up-window__button">
                  $20.00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Options Locked -->
      <div ref="top-up-locked">
        <div class="content">
          USE MODALS CONTENTS HERE
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalBody from '@/components/ModalBody'
import InnerModalMixin from '@/mixins/InnerModalMixin'
import NoticesService from '@/services/NoticesService'

export default {
  name: 'ModalsMoreOptions',
  components: {
    ModalBody
  },

  mixins: [
    InnerModalMixin
  ],

  props: {
  },

  created () {
    this.notices = new NoticesService(this)
  },

  methods: {
    onOpen () {
      this.currentModal().setWithContentOf(this, 'top-up-window')
    }
  }
}
</script>

<style scoped lang="scss">
.top-up-window {
  p {
    font-size: 22px;
    color: $color-soft-grey;
    font-family: $font-alternative;
  }
}

.top-up-window__buttons {
  margin-top: 1em;
}

.top-up-window__button-container {
  padding: 0.4em;
}

.top-up-window__button {
  font-size: 20px;
  margin-bottom: 0em;
  padding: 1.2em;
  @include button-radius('small');
  text-align: center;
  color: $color-white;
  background-color: $color-blue;
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
