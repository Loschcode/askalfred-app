import Vue from "vue";
import Router from "vue-router";
import Index from "./views/Index.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "index",
      meta: { layout: "default" },
      component: Index
    }
  ]
});
