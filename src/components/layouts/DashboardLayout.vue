<template>
  <div>
    <div class="wrapper dashboard-layout">
      <div class="wrap-without-limit container-fluid header-menu">
        <div class="row">
          <div class="col-xs-12 +no-padding">
            <div class="row middle-xs">
              <div class="col-xs-6 col-md-4 col-md-offset-2">
                <div class="header-menu__title">
                  <h1
                    class="+pointer"
                    @click="clickTitle()"
                  >
                    AskAlfred
                  </h1>
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
              <a
                href="mailto:support@askalfred.to"
                target="_blank"
              >
                Support
              </a>
            </div>
          </div>
          <div class="col-xs-2 col-md-2 +no-padding">
            <div
              class="header-submenu__more +pointer"
              @click="moreOptions()"
            >
              <img src="/images/header/submenu-more-button.svg">
            </div>
          </div>
        </div>
      </div>
      <div class="wrap container">
        <slot />
      </div>
    </div>

    <!-- Modals -->
    <modals-more-options ref="modals-more-options" />
  </div>
</template>

<script>
import CreditLeft from '@/components/Header/CreditLeft'
import OpenModalMixin from '@/mixins/OpenModalMixin'
import ModalsMoreOptions from '@/components/Layouts/DashboardLayout/Modals/MoreOptions'
import PageHelper from '@/helpers/PageHelper'

export default {
  name: 'DashboardLayout',

  components: {
    CreditLeft,
    ModalsMoreOptions
  },

  mixins: [OpenModalMixin],

  props: {
  },

  methods: {
    clickTitle () {
      PageHelper.hardRedirectTo('/')
    },

    moreOptions () {
      this.openModal('modals-more-options')
    }
  }
}
</script>

<style scoped lang="scss">
.dashboard-layout {
}
</style>
