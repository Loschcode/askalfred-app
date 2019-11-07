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
  name: 'DefaultLayout',

  props: {
  }
}
</script>

<style scoped lang="scss">

.default {
  background: $color-blue-purple-gradient;
  background-attachment: fixed;
  position: fixed;
  overflow: auto;
  width: 100%;
  color: $color-white;
  a {
    color: $color-white;
  }
}

.wrap {
  position: relative;
}
</style>
