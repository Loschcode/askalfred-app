<template>
  <div class="wrapper main-list">
    <div class="wrap-without-limit container-fluid menu">
      <div class="row">
        <div class="col-xs-12 +no-padding">
          <div class="row center-xs middle-xs">
            <div class="col-xs-6">
              <div class="menu__title">
                <h1>AskAlfred</h1>
              </div>
            </div>
            <div class="col-xs-6">
              <div class="credit +pointer">
                <div class="row">
                  <div class="col-xs-12">
                    <div class="credit__title">
                      Credit left
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-xs-12">
                    <div class="credit__left">
                      <span class="credit__left-text">
                        Less than 1 hour
                      </span>
                      <span class="credit__left-arrow">
                        <img src="/images/main-list-layout/right-arrow.svg">
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="wrap-without-limit container-fluid submenu">
      <div class="row between-xs">
        <div class="col-xs-6 +no-padding">
          <div class="submenu__text-button">
            <a href="#">
              Support
            </a>
          </div>
        </div>
        <div class="col-xs-2 +no-padding">
          <div class="submenu__more +pointer">
            <img src="/images/main-list-layout/submenu-more-button.svg">
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
</template>

<script>
export default {
  name: 'MainList',
  props: {
  }
}
</script>

<style scoped lang="scss">
.main-list {
  background: $color-very-light-grey;
  color: $color-light-grey-blueish;
  a {
    color: $color-light-grey-blueish;
  }
}

.submenu {
  margin-left: 0.1em;
  margin-right: 0.1em;
  background: $color-white;
  padding-top: 1em;
  padding-bottom: 1em;
  color: $color-mid-dark-grey;
  font-family: $font-text;
  a {
    color: $color-mid-dark-grey;
    font-family: $font-text;
  }
}

.submenu__more {
  padding-right: 0.4em;
  text-align: right;
  img {
    height: 1.2em;
  }
}

.submenu__text-button {
  text-transform: uppercase;
  font-weight: 300;
}

.menu {
  background: $color-blue-purple-gradient;
  color: $color-white;
  a {
    color: $color-white;
  }
  padding-top: 1.3em;
  padding-bottom: 1.3em;
}

.menu__title {
  h1 {
    @include breakpoint("md") {
      font-size: 5rem;
    }
    @include breakpoint("sm") {
      font-size: 10vw;
    }
    @include breakpoint("xs") {
      font-size: 12vw;
    }
  }
}

.credit {
  text-align: left;
  padding: 1em;
  background: $color-persistent-blue;
  border-radius: 8px;
}

.credit__title {
  opacity: 0.8;
  font-size: 20px;
  @include breakpoint("xs") {
    font-size: 14px;
  }
}

.credit__left {
  position: relative;
  margin-top: 0.2em;
  font-size: 22px;
}

.credit__left-text {
  @include breakpoint("xs") {
    font-size: 16px;
  }
}

.credit__left-arrow {
  position: absolute;
  right: 0;
  bottom: -3px;
  img {
    @include breakpoint("xs") {
      height: 0.8em;
    }
  }
}
</style>
