<template>
  <div id="app">
    <component :is="currentLayout">
      <router-view />
    </component>
  </div>
</template>

<script>
const defaultLayout = 'default';

export default {
  computed: {
    currentLayout () {
      return (this.layoutFromRoute || defaultLayout) + '-layout';
    },

    layoutFromRoute () {
      return this.$route.meta.layout;
    }
  }
}
</script>

<style lang="scss">
@import "src/assets/styles/app.scss";
@import "src/assets/styles/components.scss";
</style>
