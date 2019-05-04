<script>
import router from '@/router'

export default {
  created () {
    if (this.currentIdentity.role !== 'guest') {
      return router.push({ path: '/connect/sign-in' })
    }
  }
}
</script>
