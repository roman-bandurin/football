import defaultCompetitions from "/competitions.json";

export default {
  namespaced: true,
  state: {
    competitions: {
      meta: {},
      items: [],
      dict: {},
    },
  },
  getters: {},
  mutations: {
    fetchCompetitions(state, { meta, items, dict }) {
      state.competitions.meta = meta;
      state.competitions.items = items;
      state.competitions.dict = dict;
    },
  },
  actions: {
    async fetchCompetitions({ commit }) {
      // const response = await fetch('https://api.football-data.org/v2/competitions?plan=TIER_ONE', {
      //   headers: {
      //     'X-Auth-Token': '81a4c956811346659e76e611ee3f55b2'
      //   },
      // });
      // const competitions = await response.json();
      // defaultCompetitions;
      const { competitions = [], ...meta } = defaultCompetitions;

      const dict = Object.fromEntries(
        competitions.map((competition) => [competition.id, competition])
      );
      commit("fetchCompetitions", { meta, items: competitions, dict });
    },
    async fetchCompetitionsIfNotExits({
      dispatch,
      state: {
        competitions: {
          meta: { count = 0 },
        },
      },
    }) {
      if (count === 0) {
        await dispatch("fetchCompetitions");
      }
    },
  },
};
