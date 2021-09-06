<template>
  <v-sheet class="teams">
    <v-data-table
      dense
      :headers="[
        { value: 'crestUrl', text: 'Флаг', align: 'center' },
        { value: 'tla', text: 'Код', align: 'center' },
        { value: 'name', text: 'Название' },
        {
          value: 'actions',
          text: 'Действия',
          sortable: false,
          align: 'center',
        },
      ]"
      :items="teams.items"
      :items-per-page="100"
      :footer-props="{
        'items-per-page-options': [5, 10, 20, 30, 50, 100, 500, -1],
      }"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:[`item.crestUrl`]="{ item: { crestUrl } }">
        <v-emblem :url="crestUrl"></v-emblem>
      </template>
      <template v-slot:[`item.actions`]="{ item: { id: teamId } }">
        <v-btn-toggle dense borderless>
          <v-btn
            small
            text
            :to="{ name: 'TeamMatchesFrom', params: { competitionId, teamId } }"
          >
            Матчи
            <v-icon right> mdi-send </v-icon>
          </v-btn>
        </v-btn-toggle>
      </template>
    </v-data-table>
  </v-sheet>
</template>

<script>
import { mapState, mapActions } from "vuex";
import VEmblem from "./Home/VEmblem.vue";

export default {
  name: "Teams",
  components: {
    VEmblem,
  },
  props: {},
  data: () => ({}),
  computed: {
    ...mapState("competitions", ["competitions"]),
    ...mapState("teams", ["teams"]),
  },
  methods: {
    ...mapActions("competitions", ["fetchCompetitionsIfNotExits"]),
    ...mapActions("teams", ["fetchTeamsIfNotExits"]),
    async beforeTeamsCreateAndUpdate() {
      const {
        fetchCompetitionsIfNotExits,
        fetchTeamsIfNotExits,
        competitionId,
      } = this;
      await fetchCompetitionsIfNotExits();
      await fetchTeamsIfNotExits({ competitionId });
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => vm.beforeTeamsCreateAndUpdate());
  },
  async beforeRouteUpdate(to, from, next) {
    await next();
    await this.beforeTeamsCreateAndUpdate();
  },
};
</script>
