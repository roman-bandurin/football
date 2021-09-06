<template>
  <div class="competitions">
    <v-sheet class="mb-5">
      <competitions-filter
        :value="competitionId"
        :escape-route="{
          name: 'CompetitionsFrom',
        }"
        @change="
          $router.push({
            name: 'MatchesFrom',
            params: { competitionId: String($event) },
            query: { dateFrom: formatD(dateFrom), dateTo: formatD(dateTo) },
          })
        "
      >
      </competitions-filter>
    </v-sheet>

    <v-sheet class="mb-5">
      <teams-filter
        :competitionId="competitionId"
        :value="teamId"
        :escape-route="{
          name: 'TeamsFrom',
          params: {
            competitionId,
          },
        }"
        @change="
          $router.push({
            name: 'TeamMatchesFrom',
            params: {
              competitionId: String(competitionId),
              teamId: String($event),
            },
            query: { dateFrom: formatD(dateFrom), dateTo: formatD(dateTo) },
          })
        "
      ></teams-filter>
    </v-sheet>

    <v-sheet class="mb-5">
      <interval
        :value="{ dateFrom, dateTo }"
        @change="
          $router.push({
            name: 'TeamMatchesFrom',
            params: {
              competitionId: String(competitionId),
              teamId: String(teamId),
            },
            query: {
              dateFrom: formatD($event.dateFrom),
              dateTo: formatD($event.dateTo),
            },
          })
        "
      ></interval>
    </v-sheet>

    <v-sheet>
      <month-panel
        v-model="date"
        :date-from="dateFrom"
        :date-to="dateTo"
      ></month-panel>
      <calendar v-model="date"> </calendar>
    </v-sheet>
  </div>
</template>

<script>
import { lightFormat } from "date-fns";
import { mapState, mapGetters, mapActions } from "vuex";
import CompetitionsFilter from "./Home/CompetitionsFilter.vue";
import TeamsFilter from "./Home/TeamsFilter.vue";
import Calendar from "./Matches/Calendar.vue";
import Interval from "./Matches/Interval.vue";
import MonthPanel from "./Matches/MonthPanel.vue";

export default {
  name: "Matches",
  components: {
    CompetitionsFilter,
    TeamsFilter,
    Calendar,
    Interval,
    MonthPanel,
  },
  props: {
    competitionId: {
      type: Number,
      required: true,
    },
    teamId: {
      type: Number,
      required: false,
    },
    dateFrom: {
      type: Date,
      required: false,
    },
    dateTo: {
      type: Date,
      required: false,
    },
  },
  data() {
    return {
      date: new Date(),
    };
  },
  computed: {
    ...mapState("teams", ["teams"]),
    ...mapState("matches", ["matches"]),
    ...mapGetters("matches", ["events"]),
  },
  methods: {
    ...mapActions("competitions", ["fetchCompetitionsIfNotExits"]),
    ...mapActions("teams", ["fetchTeamsIfNotExits"]),
    ...mapActions("matches", ["fetchMatchesIfNotExits"]),
    async beforeMatchesCreateAndUpdate() {
      const {
        fetchCompetitionsIfNotExits,
        fetchTeamsIfNotExits,
        fetchMatchesIfNotExits,
        competitionId,
        teamId,
        dateFrom,
        dateTo,
      } = this;
      await fetchCompetitionsIfNotExits();
      await fetchTeamsIfNotExits({ competitionId });
      await fetchMatchesIfNotExits({ competitionId, teamId, dateFrom, dateTo });
    },
    formatD(date, isMonth = false) {
      return date !== undefined
        ? lightFormat(date, isMonth ? "MM.yyyy" : "dd.MM.yyyy")
        : "";
    },
    formatY(date, isMonth = false) {
      return date !== undefined
        ? lightFormat(date, isMonth ? "yyyy-MM" : "yyyy-MM-dd")
        : "";
    },
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => vm.beforeMatchesCreateAndUpdate());
  },
  async beforeRouteUpdate(to, from, next) {
    await next();
    await this.beforeMatchesCreateAndUpdate();
  },
};
</script>
