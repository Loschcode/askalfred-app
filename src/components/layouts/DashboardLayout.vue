<template>
  <div>
    <div class="wrapper dashboard-layout">
      <div class="wrap-without-limit container-fluid header-menu">
        <div class="row">
          <div class="col-xs-12 +no-padding">
            <div class="row middle-xs">
              <div class="col-xs-6 col-md-4 col-md-offset-2">
                <div class="header-menu__title">
                  <h1>AskAlfred</h1>
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
        <div class="row between-xs around-md">
          <div class="col-xs-6 col-md-6 +no-padding">
            <div class="header-submenu__text-button">
              <a href="#">
                Support
              </a>
            </div>
          </div>
          <div class="col-xs-2 col-md-2 +no-padding">
            <div class="header-submenu__more +pointer">
              <img src="/images/header/submenu-more-button.svg">
            </div>
          </div>
        </div>
      </div>
      <div class="wrap container">
        <slot />
      </div>
    </div>
    <div class="wrap container">
      <!-- New request -->
      <div class="row center-xs">
        <div class="col-xs-8 col-md-6">
          <div class="footer new-request">
            <div class="button button__blue-on-white">
              New request
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CreditLeft from '@/components/Header/CreditLeft'

export default {
  name: 'DashboardLayout',
  components: {
    CreditLeft
  },
  props: {
  }
}
</script>

<style scoped lang="scss">
.dashboard-layout {
}

.footer {
  margin-top: -4em;
}
</style>
