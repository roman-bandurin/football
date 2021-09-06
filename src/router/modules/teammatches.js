import { toNumOrUndefined, toDateOrUndefined } from "./../utils.js";
export default [
  {
    name: "TeamMatchesFrom",
    path: "/competitions/:competitionId/teams/:teamId/matches",
    redirect: ({
      params: { competitionId, teamId } = {},
      query: { dateFrom, dateTo } = {},
    }) => {
      if (competitionId !== null && isFinite(competitionId)) {
        if (teamId !== null && isFinite(teamId)) {
          return {
            name: "TeamMatchesTo",
            params: {
              competitionId,
              teamId,
            },
            query: {
              ...(dateFrom !== "" ? { dateFrom } : {}),
              ...(dateTo !== "" ? { dateTo } : {}),
            },
          };
        } else {
          return {
            name: "MatchesFrom",
            params: { competitionId },
            query: {
              ...(dateFrom !== "" ? { dateFrom } : {}),
              ...(dateTo !== "" ? { dateTo } : {}),
            },
          };
        }
      } else {
        return {
          name: "CompetitionsFrom",
        };
      }
    },
  },
  {
    name: "TeamMatchesTo",
    path: "/competitions/:competitionId/teams/:teamId/matches",
    props: ({
      params: { competitionId, teamId } = {},
      query: { dateFrom, dateTo } = {},
    }) => ({
      competitionId: toNumOrUndefined(competitionId),
      teamId: toNumOrUndefined(teamId),
      dateFrom: toDateOrUndefined(dateFrom),
      dateTo: toDateOrUndefined(dateTo),
    }),
    component: () =>
      import(/* webpackChunkName: "matches" */ "./../../views/Matches.vue"),
  },
];
