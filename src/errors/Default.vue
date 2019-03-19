

<template>
  <div class="error">
    <div
      @click="refreshPage()"
      class="+pointer"
    >
      Error page<br />
      {{ error.message }}<br />
      {{ error.raw }}
    </div>
  </div>
</template>

<script>
import PageHelper from '@/helpers/PageHelper'

export default {
  name: 'ErrorDefault',
  props: [
    'error'
  ],

  methods: {
    refreshPage () {
      PageHelper.refreshPage()
    },
  },
}
</script>

<style scoped lang="scss">
.default {
  background: $color-blue-purple-gradient;
  color: $color-white;
  a {
    color: $color-white;
  }
}
</style>
