<template>
  <div>
    <div v-if="isLoading">
      <div class="button button--half-squared button__white-on-blue button__white-on-blue--soft button__white-on-blue-loader">
        <loading-button
          :color="`blue`"
          :size="20"
        />
      </div>
    </div>
    <div v-else>
      <div class="button button--half-squared button__white-on-blue button__white-on-blue--soft">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import LoadingButton from '@/components/Loading/Button'

export default {
  name: 'LoadingButtonWhite',
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
