import router from '@/router'

class PageHelper {
  refreshPage () {
    window.location.reload()
  }

  hardRedirectTo (route) {
    const path = router.resolve(route).href
    window.location = `${window.location.origin}${path}`
  }

  openBlank (url) {
    window.open(url, '_blank')
  }
}

export default new PageHelper()
