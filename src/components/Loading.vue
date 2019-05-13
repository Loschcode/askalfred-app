<template>
  <svg
    :class="`loading loading__${color} progress`"
    width="40"
    height="40"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="20"
      cy="20"
      r="15"
    />
  </svg>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    color: {
      default: 'white',
      type: String,
      required: false
    }
  }
}
</script>

<style scoped lang="scss">
</style>
