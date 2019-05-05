<script>
import router from '@/router'

export default {
  created () {
    if (this.currentIdentity.role !== 'customer') {
      return router.push({ path: '/connect/sign-in' })
    }
  }
}
</script>
