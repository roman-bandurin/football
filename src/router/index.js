import competitions from "./modules/competitions.js";
import teams from "./modules/teams.js";
import matches from "./modules/matches.js";
import teammatches from "./modules/teammatches.js";

export default [
  {
    name: "Home",
    path: "/",
    props: true,
    component: () => import(/* webpackChunkName: "home" */ "../views/Home.vue"),
  },
  ...competitions,
  ...matches,
  ...teams,
  ...teammatches,
  {
    name: "About",
    path: "/about",
    props: true,
    component: () =>
      import(/* webpackChunkName: "home" */ "../views/About.vue"),
  },
];