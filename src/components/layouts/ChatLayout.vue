<template>
  <div class="before-footer">
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
        <div class="row between-xs around-md">
          <div class="col-xs-4 col-md-4 +no-padding">
            <div class="header-submenu__text-button">
              <a href="#">
                Back
              </a>
            </div>
          </div>

          <div class="col-xs-8 col-md-4">
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
    </div>
    <div class="wrap container">
      <div class="row">
        <div class="col-xs-12">
          <div class="footer message-input">
            <textarea
              v-model="currentMessage"
              name="message"
              placeholder="Write a reply..."
            />

            <div class="message-input__button">
              <div v-if="currentMessage">
                <div class="message-input__button-send">
                  <a href="#">
                    Send
                  </a>
                </div>
              </div>
              <div v-else>
                <div class="message-input__button-join-file">
                  <div class="+pointer">
                    <img src="/images/tickets/join-file.svg">
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import CreditLeft from '@/components/header/CreditLeft'
import autosize from 'autosize'

export default {
  name: 'ChatLayout',
  components: {
    CreditLeft
  },
  props: {
  },
  data () {
    return {
      currentMessage: ''
    }
  },

  mounted () {
    autosize(document.querySelectorAll('textarea'))
  }
}
</script>

<style scoped lang="scss">
.chat-layout {
}

.footer {
  margin-top: -5em;
}

.message-input {
  position: relative;
  padding: 1em;

  textarea {
    height: 3em;
    border-radius: 2px;
    font-size: 16px;
    padding: 0.8em;
    padding-right: 3.5em;
    width: 100%;
    border: 1px solid $color-light-grey-blueish;
    &::placeholder {
      color: $color-light-grey-blueish;
    }
  }
}

.message-input__button-send {
  position: absolute;
  width: 1.5em;
  top: 1.9em;
  right: 2.8em;
  text-transform: uppercase;
}

.message-input__button-join-file {
  position: absolute;
  width: 1.5em;
  top: 1.7em;
  right: 2em;
}
</style>
