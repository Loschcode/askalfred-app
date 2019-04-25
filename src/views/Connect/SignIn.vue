<template>
  <div class="sign-in">
    <!-- Title -->
    <div class="row center-xs">
      <div class="col-xs-10">
        <div class="title">
          <h1>AskAlfred</h1>
        </div>
      </div>
    </div>

    <!-- Connect -->
    <div class="row center-xs">
      <div class="col-xs-10 col-md-5">
        <div class="connect">
          <div class="connect__email">
            <div class="connect__image connect__image--email">
              <img src="/images/icons/email.svg">
            </div>
            <input
              type="email"
              placeholder="email@gmail.com"
            >
          </div>
          <div class="connect__password">
            <div class="connect__image connect__image--password">
              <img src="/images/icons/password.svg">
            </div>
            <input
              type="password"
              placeholder="password"
            >
          </div>
          <div class="connect__confirm">
            <div class="button button--half-squared button__white-on-blue button__white-on-blue--soft">
              <a href="#">Sign in</a>
            </div>
          </div>
          <div class="connect__forgot">
            <a href="#">Forgot your password?</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Or -->
    <div class="row center-xs">
      <div class="col-xs-12 col-md-6">
        <div class="or">
          <div class="row center-xs">
            <div class="col-xs-5 +no-padding-right">
              <div class="or__divider" />
            </div>
            <div class="col-xs-1 +no-padding">
              <div class="or__text">
                Or
              </div>
            </div>
            <div class="col-xs-5 +no-padding-left">
              <div class="or__divider" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Introduce yourself -->
    <div class="row center-xs">
      <div class="col-xs-8 col-md-4">
        <div class="register">
          <div class="button button--half-squared button__white-on-blue button__white-on-blue--soft">
            <router-link :to="{ path: '/getting-started/what-is-your-name'}">
              Introduce yourself
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Unique footer -->
    <div class="row center-xs">
      <div class="footer-placeholder" />
      <div class="footer">
        <router-link :to="{ path: '/pages/legal-mentions'}">
          Legal mentions
        </router-link> |
        <router-link :to="{ path: '/pages/privacy-policy'}">
          Privacy policy
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  props: {
  }
}
</script>

<style scoped lang="scss">
.title {
  margin-top: 4em;
  margin-bottom: 4em;
}

.connect {
  input {
    @include transparent-input(1em);
  }
}

.connect__email {
  position: relative;
  padding-left: 1em;
}

.connect__password {
  position: relative;
  padding-left: 1em;
}

.connect__image {
  position: absolute;
}
.connect__image--email {
  left: 5px;
  bottom: 8px;
  img {
    height: spacing(4);
  }
}

.connect__image--password {
  left: 8px;
  bottom: 5px;
  img {
    height: spacing(6);
  }
}

.connect__confirm {
  padding-top: 2em;
  margin-left: 1.5em;
  margin-right: 1.5em;
}

.connect__forgot {
  padding-top: 0.5em;
  font-size: sizing(2.3);
  a {
    color: $color-white;
  }
}

.or {
  padding-top: 5em;
  position: relative;
}

.or__divider {
  border-bottom: 1px solid $color-white;
  width: 100%;
}

.or__text {
  text-transform: uppercase;
  margin-top: -0.5em;
  font-size: sizing(2.2);
}

.register {
  margin-top: 4em;
}

.footer-placeholder {
  margin: 2em;
}

.footer {
  position: absolute;
  bottom: 0;
  padding: 1em;
  color: $color-white;
  a {
    color: $color-white;
  }
}
</style>
