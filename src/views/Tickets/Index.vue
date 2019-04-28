<template>
  <div class="tickets-index" />
</template>

<script>
import router from '@/router'

export default {
  name: 'TicketsIndex',

  created () {
    router.push({ path: '/tickets/list' })
  }
}
</script>

<style scoped lang="scss">
</style>
