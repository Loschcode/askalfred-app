<template>
  <div class="more-options">
    <modal ref="current-modal" />

    <div v-if="isOpen">
      <div ref="coming-soon">
        <div class="content content-coming-soon">
          <div class="row center-xs">
            <div class="col-md-12">
              PUT STUFF IN HERE
            </div>
          </div>
        </div>
      </div>

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
      })
      // this.currentModal().setWithContentOf(this, 'thank-you')
    }
  }
}
</script>

<style scoped lang="scss">
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
