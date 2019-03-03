<template>
  <div class="wrapper default">
    <!-- No header or footer in this layout -->
    <div class="wrap container">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Default',
  props: {
  }
}
</script>

<style scoped lang="scss">
.default {
  background: $color-blue-purple-gradient;
  color: $color-white;
}
</style>
