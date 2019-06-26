<template>
  <div>
    <div
      v-if="isLoading"
      class="lambda"
    >
      <loading-button
        :color="`white`"
        :size="28"
      />
    </div>
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script>
import LoadingButton from '@/components/Loading/Button'

export default {
  name: 'LoadingButtonLambda',
  components: {
    LoadingButton
  },

  props: {
    isLoading: {
      default: false,
      type: Boolean
    }
  },

  computed: {
    isItLoading () {
      return this.isLoading
    }
  }
}
</script>

<style scoped lang="scss">
.lambda {
  width: 100%;
}
</style>
