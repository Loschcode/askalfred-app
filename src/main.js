import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// Layouts
import Default from "./layouts/Default";

Vue.component("default-layout", Default);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
