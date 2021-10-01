import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import Vuetify from "vuetify/lib/framework";

import stores from "./store/index";
import routes from "./router/index";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(Vuetify);

new Vue({
  store: new Vuex.Store(stores),
  router: new VueRouter({ mode: "hash", routes }),

  vuetify: new Vuetify({
    theme: {
      themes: {
        light: {
          primary: "#558B2F", // light-green darken-3
          secondary: "#689F38", // light-green darken-2
          accent: "#7CB342", // light-green darken-1
          error: "#E64A19", //deep-orange darken-2
        },
      },
    },
  }),
  render: (h) => h(App),
}).$mount("#app");
