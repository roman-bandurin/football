<template>
  <v-sheet class="competitions">
    <v-data-table
      dense
      :headers="[
        { value: 'emblemUrl', text: 'Флаг', align: 'center' },
        { value: 'code', text: 'Код', align: 'center' },
        { value: 'name', text: 'Название' },
        { value: 'area.name', text: 'Область' },
        { value: 'currentSeason.startDate', text: 'Начало', align: 'center' },
        { value: 'currentSeason.endDate', text: 'Конец', align: 'center' },
        {
          value: 'numberOfAvailableSeasons',
          text: 'Сезоны',
          align: 'center',
        },
        {
          value: 'actions',
          text: 'Действия',
          sortable: false,
          align: 'center',
        },
      ]"
      :items="competitions.items"
      :items-per-page="100"
      :footer-props="{
        'items-per-page-options': [5, 10, 20, 30, 50, 100, 500, -1],
      }"
      item-key="id"
      class="elevation-1"
    >
      <template v-slot:[`item.emblemUrl`]="{ item: { emblemUrl } }">
        <v-emblem :url="emblemUrl"></v-emblem>
      </template>
      <template v-slot:[`item.actions`]="{ item: { id: competitionId } }">
        <v-btn-toggle dense borderless>
          <v-btn
            small
            text
            :to="{ name: 'TeamsFrom', params: { competitionId } }"
          >
            Команды
            <v-icon right> mdi-send </v-icon>
          </v-btn>
          <v-btn
            small
            text
            :to="{ name: 'MatchesFrom', params: { competitionId } }"
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
  name: "Competitions",
  components: {
    VEmblem,
  },
  data: () => ({}),
  computed: {
    ...mapState("competitions", ["competitions"]),
  },
  methods: {
    ...mapActions("competitions", ["fetchCompetitionsIfNotExits"]),
    async beforeCompetitionsCreateAndUpdate() {
      const { fetchCompetitionsIfNotExits } = this;
      await fetchCompetitionsIfNotExits();
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => vm.beforeCompetitionsCreateAndUpdate());
  },
  async beforeRouteUpdate(to, from, next) {
    await next();
    await this.beforeCompetitionsCreateAndUpdate();
  },
};
</script>
