export default [
  {
    name: "CompetitionsFrom",
    path: "/competitions",
    props: true,
    redirect: () => {
      return {
        name: "CompetitionsTo",
      };
    },
  },
  {
    name: "CompetitionsTo",
    path: "/competitions",
    props: true,
    component: () =>
      import(
        /* webpackChunkName: "competitions" */ "./../../views/Competitions.vue"
      ),
  },
];
