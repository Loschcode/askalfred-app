<template>
  <div>
    <div v-if="isLoading">
      <div class="button button__blue-on-white button--bold">
        <loading-button
          :color="`blue`"
          :size="28"
        />
      </div>
    </div>
    <div v-else>
      <div class="button button__blue-on-white button--large button--bold">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import LoadingButton from '@/components/Loading/Button'

export default {
  name: 'LoadingButtonBlue',
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
