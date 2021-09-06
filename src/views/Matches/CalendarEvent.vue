<template>
  <v-container fluid color="grey darken-2">
    <v-row class="d-flex flex-row flex-nowrap justify-start align-baseline">
      <template v-if="teams.dict[homeTeamId]">
        <v-col
          cols="1"
          class="pa-0 text-center text-truncate"
          style="min-width: 36px"
        >
          <v-emblem :url="teams.dict[homeTeamId].crestUrl"></v-emblem>
        </v-col>
        <v-col
          class="pa-0 text-center text-truncate d-none d-lg-block"
          style="min-width: 30px"
        >
          {{ teams.dict[homeTeamId].tla }}
        </v-col>
        <v-spacer></v-spacer>
        <v-col
          v-if="score.homeTeam !== null && score.awayTeam !== null"
          cols="1"
          class="pa-0 text-center text-truncate"
          style="min-width: 20px"
        >
          {{ score.homeTeam }}
        </v-col>
      </template>
      <v-col cols="1" class="pa-0 text-center text-truncate">
        <span v-if="score.homeTeam !== null && score.awayTeam !== null">:</span>
        <span v-else>vs</span>
      </v-col>
      <template v-if="teams.dict[awayTeamId]">
        <v-col
          v-if="score.homeTeam !== null && score.awayTeam !== null"
          cols="1"
          class="pa-0 text-center text-truncate"
          style="min-width: 20px"
        >
          {{ score.awayTeam }}
        </v-col>
        <v-col
          class="pa-0 text-center text-truncate d-none d-lg-block"
          style="min-width: 30px"
        >
          {{ teams.dict[awayTeamId].tla }}
        </v-col>
        <v-col
          cols="1"
          class="pa-0 text-center text-truncate"
          style="min-width: 36px"
        >
          <v-emblem :url="teams.dict[awayTeamId].crestUrl"></v-emblem>
        </v-col>
      </template>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import VEmblem from "../Home/VEmblem.vue";

export default {
  name: "CalendarEvent",
  components: {
    VEmblem,
  },
  props: {
    matchId: {
      type: Number,
      required: true,
    },
    homeTeamId: {
      type: Number,
      required: true,
    },
    awayTeamId: {
      type: Number,
      required: true,
    },
    score: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("teams", ["teams"]),
  },
};
</script>
