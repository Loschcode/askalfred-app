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
        <div class="content more-options-window">
          <div class="row center-xs">
            <div class="col-md-12">
              <div class="more-options__title">
                More options ...
              </div>
              <div class="more-options__buttons">
                <div class="button button__white-on-red button--squared button--bold">
                  Cancel request
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Success -->
      <div ref="thank-you">
        <div class="content">
          <modals-common-success
            :title="`Thank you!`"
            :content="`We will get back to you shortly to give your early access.`"
            :action="close"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from '@/components/Modal'
import ModalsCommonSuccess from '@/components/modals/common/success'

export default {
  name: 'ModalsMoreOptions',
  components: {
    Modal,
    ModalsCommonSuccess
  },
  props: {
  },

  data () {
    return {
      isOpen: false
    }
  },

  methods: {
    currentModal () {
      return this.$refs['current-modal']
    },

    close () {
      this.currentModal().close()
    },

    open () {
      this.isOpen = true
      this.$nextTick(() => {
        this.currentModal().open()
        this.currentModal().setWithContentOf(this, 'more-options-window')
      })
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
