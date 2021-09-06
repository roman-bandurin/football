<template>
<v-sheet :height="height">
  <v-slider
  v-model="height"
    label="Высота календаря"
    min="300"
    step="50"
    max="2000"
    thumb-label="always"
    @change="$refs.calendar.updateEventVisibility()"
  ></v-slider>
  <v-calendar
    ref="calendar"
    :value="value"
    type="month"
    :events="events"
    locale="ru"
    :event-height="20"
    weekdays="1, 2, 3, 4, 5, 6, 0"
    event-color="white"
    event-text-color="black"
    event-more-text="..."
    @click:more="$emit('change', parseY($event.date))"
    @click:date="$emit('change', parseY($event.date))"
  >
    <template
      v-slot:event="{ event: { matchId, homeTeamId, awayTeamId, score } }"
    >
      <calendar-event
        :match-id="matchId"
        :home-team-id="homeTeamId"
        :away-team-id="awayTeamId"
        :score="score"
        :key="matchId"
      ></calendar-event>
    </template>
  </v-calendar>
</v-sheet>
</template>

<script>
import { parse } from "date-fns";
import { mapState, mapGetters } from "vuex";
import CalendarEvent from "./CalendarEvent.vue";

export default {
  name: "Calendar",
  components: {
    CalendarEvent,
  },
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: Date,
  },
  data() {
    return {
      height: 600
    }
  },
  computed: {
    ...mapState("teams", ["teams"]),
    ...mapGetters("matches", ["events"]),
  },
  methods: {
    parseY(date) {
      return date !== undefined
        ? parse(date, "yyyy-MM-dd", new Date(0, 0, 1))
        : undefined;
    }
  },
};
</script>
