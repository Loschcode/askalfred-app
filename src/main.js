import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Layouts
import Default from "./layouts/Default";

import { createProvider } from './vue-apollo'

Vue.component("default-layout", Default);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");
