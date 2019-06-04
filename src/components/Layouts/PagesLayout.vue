<template>
  <div class="wrapper default">
    <!-- No header in this layout -->
    <div class="wrap container">
      <slot />
    </div>
    <!-- No footer in this layout -->
  </div>
</template>

<script>
export default {
  name: 'PagesLayout',

  props: {
  }
}
</script>

<style scoped lang="scss">
.default {
  background-color: $color-blue;
  color: $color-white;
  a {
    color: $color-white;
  }
}
</style>
