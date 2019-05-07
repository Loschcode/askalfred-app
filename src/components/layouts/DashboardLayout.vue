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
              <a href="mailto:support@askalfred.app">
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

    <div class="footer wrap container-fluid">
      <!-- New request -->
      <div class="row center-xs">
        <div class="col-xs-8 col-md-6">
          <div class="new-request">
            <div class="button button__blue-on-white button--large button--bold">
              New request
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modals -->
    <modals-more-options ref="modals-more-options" />
  </div>
</template>

<script>
import CreditLeft from '@/components/Header/CreditLeft'
import ModalsMixin from '@/mixins/ModalsMixin'
import ModalsMoreOptions from '@/components/Layouts/DashboardLayout/Modals/MoreOptions'

export default {
  name: 'DashboardLayout',
  components: {
    CreditLeft,
    ModalsMoreOptions
  },

  mixins: [ModalsMixin],

  props: {
  },

  methods: {
    moreOptions () {
      this.openModal('modals-more-options')
    }
  }
}
</script>

<style scoped lang="scss">
.dashboard-layout {
}

.footer {
  position: absolute;
  bottom: 0;
  padding: 1em;
  padding-bottom: 1.5em;
}
</style>
