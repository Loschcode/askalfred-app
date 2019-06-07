<template>
  <div>
    <div v-if="isLoading">
      <div class="button button__white-on-red button--squared button--bold button__white-on-red-loader">
        <loading-button
          :color="`white`"
          :size="20"
        />
      </div>
    </div>
    <div v-else>
      <div class="button button__white-on-red button--squared button--bold">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import LoadingButton from '@/components/Loading/Button'

export default {
  name: 'LoadingButtonRed',
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
