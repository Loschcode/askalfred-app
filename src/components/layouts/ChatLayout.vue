<template>
  <div class="wrapper chat-layout">
    <div class="wrap-without-limit container-fluid header-menu">
      <div class="row">
        <div class="col-xs-12 +no-padding">
          <div class="row middle-xs">
            <div class="col-xs-6 col-md-4 col-md-offset-2">
              <div class="header-menu__text">
                I already spent ...
              </div>
              <div class="header-menu__time">
                10 hours 00 sec
              </div>
            </div>
            <div class="col-xs-6 col-md-4">
              <credit-left />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap-without-limit container-fluid header-submenu">
      <div class="row between-xs">
        <div class="col-xs-4 +no-padding">
          <div class="header-submenu__text-button">
            <a href="#">
              Back
            </a>
          </div>
        </div>

        <div class="col-xs-8">
          <div class="row end-xs middle-xs">
            <div class="col-xs-10">
              <div class="header-submenu__title">
                I need a chauffeur
              </div>
              <div class="header-submenu__subtitle">
                No answer yet
              </div>
            </div>
            <div class="col-xs-1 +no-padding">
              <div class="header-submenu__more +pointer">
                <img src="/images/header/submenu-more-button.svg">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap container">
      <slot />
    </div>
    <div class="wrap container">
      <!-- No footer -->
    </div>
  </div>
  </div>
</template>

<script>
import CreditLeft from '@/components/header/CreditLeft'

export default {
  name: 'ChatLayout',
  components: {
    CreditLeft
  },
  props: {
  }
}
</script>

<style scoped lang="scss">
.chat-layout {
}
</style>
