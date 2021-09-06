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
  router: new VueRouter({ routes }),

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

// есть таблица областей, сами данные корректно получаются по ajax, но пока используются инлайновые
// сама таблица не особо нужна, зато нужны другие таблицы
// Нужна таблица соревнования и календарь по ней
// нужна таблица команды и календарь по ней
// /v2/matches?competitions=2013,2016,2021,2001,2018,2015,2002,2019,2003,2017,2152,2014,2000
// Есть сущности, загружющиеся по открытию в меню
// Есть таблицы по соревнованиям и командам, но нужны еще календари по ним
// Есть календарь, в нем даже настроены события, события красиво выглядят
// Дневной календарь показывать не вариант, так что надо сделать таблицу с дневными событиями

/*
/v2/competitions/
/v2/competitions/2000
/v2/competitions/{id}/teams
/v2/competitions/{id}/matches
/v2/matches
/v2/matches/{id}
/v2/teams/{id}/matches/
/v2/teams/{id}

competitions[]
  competition
    teams[]
    matches[]

teams[] (скопом нельзя)
  team
    competition (никаких связей)
    matches[]

matches[]
  match
    team (есть связь)
    competition (есть связь)
    date (utcDate, есть связь)
*/
