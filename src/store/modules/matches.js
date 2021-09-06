import { parseISO, formatISO, isBefore, isAfter } from "date-fns";
import defaultMatches from "/matchesByCompetitionAndTeam.json";

export default {
  namespaced: true,
  state: {
    matches: {
      teamId: undefined,
      meta: {},
      items: [],
      dict: {},
    },
    days: {},
  },
  getters: {
    events: (state) =>
      state.matches.items.map(
        ({
          id: matchId,
          utcDate: matchDate,
          homeTeam: { id: homeTeamId },
          awayTeam: { id: awayTeamId },
          score: { fullTime: score },
        }) => ({
          matchId,
          homeTeamId,
          awayTeamId,
          score,
          start: formatISO(parseISO(matchDate), { representation: "date" }),
        })
      ),
  },
  mutations: {
    fetchMatches(state, { teamId, dateFrom, dateTo, meta, items, dict, days }) {
      state.matches.teamId = teamId;
      state.matches.dateFrom = dateFrom;
      state.matches.dateTo = dateTo;
      state.matches.meta = meta;
      state.matches.items = items;
      state.matches.dict = dict;
      state.matches.days = days;
    },
  },
  actions: {
    async fetchMatches(
      { commit },
      { competitionId, teamId, dateFrom, dateTo }
    ) {
      // 2013,2016,2021,2001,2018,2015,2002,2019,2003,2017,2152,2014,2000
      // const response = await fetch('https://api.football-data.org/v2/competitions/2000/matches', {
      //   headers: {
      //     'X-Auth-Token': '81a4c956811346659e76e611ee3f55b2'
      //   },
      // });
      // const competitionMatches = await response.json();
      // const defaultMatches;

      let { [competitionId]: { all: { matches = [], ...meta } = {} } = {} } =
        defaultMatches;

      if (teamId !== undefined) {
        matches =
          matches.filter(
            ({ homeTeam: { id: homeTeamId }, awayTeam: { id: awayTeamId } }) =>
              homeTeamId === teamId || awayTeamId === teamId
          ) ?? [];
      }

      matches =
        matches.filter(
          ({ utcDate }) =>
            (dateTo === undefined || isBefore(parseISO(utcDate), dateTo)) &&
            (dateFrom === undefined || isAfter(parseISO(utcDate), dateFrom))
        ) ?? [];

      const dict = Object.fromEntries(
        matches.map((match) => [match.id, match])
      );

      const days = matches.reduce((acc, match) => {
        const date = formatISO(parseISO(match.utcDate), {
          representation: "date",
        });
        acc[date] === undefined ? (acc[date] = []) : undefined;
        acc[date].push(match);
        return acc;
      }, {});

      commit("fetchMatches", {
        teamId,
        dateFrom,
        dateTo,
        meta,
        items: matches,
        dict,
        days,
      });
    },
    async fetchMatchesIfNotExits(
      {
        dispatch,
        state: {
          matches: {
            teamId: oldTeamId = 0,
            dateFrom: oldDateFrom = 0,
            dateTo: oldDateTo = 0,
            meta: {
              competition: { id: oldCompetitionId = 0 } = {},
              count = 0,
            } = {},
          },
        },
      },
      { competitionId, teamId, dateFrom, dateTo }
    ) {
      if (
        competitionId !== oldCompetitionId ||
        teamId !== oldTeamId ||
        dateFrom !== oldDateFrom ||
        dateTo !== oldDateTo ||
        count === 0
      ) {
        await dispatch("fetchMatches", {
          competitionId,
          teamId,
          dateFrom,
          dateTo,
        });
      }
    },
  },
};
