import { toNumOrUndefined, toDateOrUndefined } from "./../utils.js";

export default [
  {
    name: "MatchesFrom",
    path: "/competitions/:competitionId/matches",
    redirect: ({
      params: { competitionId } = {},
      query: { dateFrom, dateTo } = {},
    }) => {
      if (competitionId !== null && isFinite(competitionId)) {
        return {
          name: "MatchesTo",
          params: { competitionId },
          query: {
            ...(dateFrom !== "" ? { dateFrom } : {}),
            ...(dateTo !== "" ? { dateTo } : {}),
          },
        };
      } else {
        return {
          name: "CompetitionsFrom",
        };
      }
    },
  },
  {
    name: "MatchesTo",
    path: "/competitions/:competitionId/matches",
    props: ({
      params: { competitionId } = {},
      query: { dateFrom, dateTo } = {},
    }) => ({
      competitionId: toNumOrUndefined(competitionId),
      dateFrom: toDateOrUndefined(dateFrom),
      dateTo: toDateOrUndefined(dateTo),
    }),
    component: () =>
      import(/* webpackChunkName: "matches" */ "./../../views/Matches.vue"),
  },
];
