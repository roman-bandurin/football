import defaultTeams from "/teamsByCompetition.json";

export default {
  namespaced: true,
  state: {
    teams: {
      meta: {},
      items: [],
      dict: {},
    },
  },
  getters: {},
  mutations: {
    fetchTeams(state, { meta, items, dict }) {
      state.teams.meta = meta;
      state.teams.items = items;
      state.teams.dict = dict;
    },
  },
  actions: {
    async fetchTeams({ commit }, { competitionId }) {
      // const response = await fetch('https://api.football-data.org/v2/competitions?plan=TIER_ONE', {
      //   headers: {
      //     'X-Auth-Token': '81a4c956811346659e76e611ee3f55b2'
      //   },
      // });
      // const competitions = await response.json();
      // defaultCompetitions;
      const { [competitionId]: { teams = [], ...meta } = {} } = defaultTeams;
      const dict = Object.fromEntries(teams.map((team) => [team.id, team]));
      commit("fetchTeams", { meta, items: teams, dict });
    },
    async fetchTeamsIfNotExits(
      {
        dispatch,
        state: {
          teams: {
            meta: {
              competition: { id: oldCompetitionId = 0 } = {},
              count = 0,
            } = {},
          },
        },
      },
      { competitionId }
    ) {
      if (competitionId !== oldCompetitionId || count === 0) {
        await dispatch("fetchTeams", { competitionId });
      }
    },
  },
};
