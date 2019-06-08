<template>
  <div class="row middle-xs center-xs">
    <div class="col-xs-12">
      <half-circle-spinner
        :animation-duration="1000"
        :size="size"
        :color="displayedColor"
      />
    </div>
  </div>
</template>

<script>
import { HalfCircleSpinner } from 'epic-spinners'

export default {
  name: 'LoadingButton',
  components: {
    HalfCircleSpinner
  },

  props: {
    color: {
      default: 'white',
      type: String,
      required: true
    },

    size: {
      default: 28,
      type: Number,
      required: false
    }
  },

  computed: {
    displayedColor () {
      if (this.color === 'white') return '#ffffff'
      if (this.color === 'blue') return '#5f8ae4'
      return ''
    }
  }
}
</script>

<style scoped lang="scss">
</style>
