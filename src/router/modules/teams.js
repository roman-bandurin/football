import { toNumOrUndefined } from "./../utils.js";

export default [
  {
    name: "TeamsFrom",
    path: "/competitions/:competitionId/teams",
    redirect: ({ params: { competitionId } = {} }) => {
      if (competitionId !== null && isFinite(competitionId)) {
        return {
          name: "TeamsTo",
          params: { competitionId },
        };
      } else {
        return {
          name: "CompetitionsFrom",
        };
      }
    },
  },
  {
    name: "TeamsTo",
    path: "/competitions/:competitionId/teams",
    props: ({ params: { competitionId } = {} }) => ({
      competitionId: toNumOrUndefined(competitionId),
    }),
    component: () =>
      import(/* webpackChunkName: "teams" */ "./../../views/Teams.vue"),
  },
];
