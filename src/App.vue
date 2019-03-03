<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
const defaultLayout = 'default';

export default {
  computed: {
    layout () {
      return (this.$route.meta.layout || defaultLayout) + '-layout';
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/styles/helpers.scss";
@import "src/assets/styles/app.scss";
@import "src/assets/styles/components.scss";
</style>
