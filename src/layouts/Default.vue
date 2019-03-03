<template>
  <div class="wrapper default">
    <div class="wrap container-fluid">
      HEADER
    </div>

    <div class="wrap container">
      INSIDE SLOT
      <!-- <slot /> -->
    </div>

    <div class="wrap container-fluid">
      FOOTER
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
