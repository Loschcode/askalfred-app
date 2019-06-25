<template>
  <span>
    <span v-if="isLoading">
      <loading-button
        :color="`white`"
        :size="28"
      />
    </span>
    <span v-else>
      <slot />
    </span>
  </span>
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
</style>
