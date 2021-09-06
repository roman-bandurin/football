<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :return-value.sync="dates"
    transition="scale-transition"
    offset-y
    max-width="auto"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="dateRangeText"
        label="Интервал"
        hint="Выберите интервал"
        persistent-hint
        prepend-icon="mdi-calendar-range"
        readonly
        clearable
        v-bind="attrs"
        v-on="on"
        @click:clear="
          $emit('change', {
            dateFrom: undefined,
            dateTo: undefined,
          })
        "
      ></v-text-field>
    </template>
    <v-date-picker
      v-model="dates"
      locale="ru"
      range
      no-title
      full-width
      @change="
        $refs.menu.save($event);
        $emit('change', {
          dateFrom: transformDate($event[0], datesInclude[0]),
          dateTo: transformDate($event[1], datesInclude[1]),
        });
      "
    >
      <v-btn-toggle
        v-model="datesInclude"
        multiple
        style="width: 100%"
        borderless
      >
        <v-btn text style="flex-grow: 1">
          <v-icon class="mr-3">mdi-calendar-start</v-icon>
          <span>от</span>
        </v-btn>
        <v-btn text style="flex-grow: 1">
          <v-icon class="mr-3">mdi-calendar-end</v-icon>
          <span>до</span>
        </v-btn>
      </v-btn-toggle>
    </v-date-picker>
  </v-menu>
</template>

<script>
import { lightFormat, parse } from "date-fns";

export default {
  name: "Interval",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: Object,
  },
  data() {
    return {
      menu: false,
      dates: [undefined, undefined],
      datesInclude: [],
    };
  },
  computed: {
    dateRangeText: {
      get() {
        const {
          formatD,
          value: { dateFrom, dateTo },
        } = this;
        return `${formatD(dateFrom)} ~ ${formatD(dateTo)}`;
      },
      set() {},
    },
  },
  methods: {
    transformDate(date, include) {
      const { parseY } = this;
      return parseY(include !== undefined ? date : undefined);
    },
    formatD(date) {
      return date !== undefined ? lightFormat(date, "dd.MM.yyyy") : "";
    },
    parseY(date) {
      return date !== undefined
        ? parse(date, "yyyy-MM-dd", new Date(0, 0, 1))
        : undefined;
    },
    formatY(date) {
      return date !== undefined ? lightFormat(date, "yyyy-MM-dd") : "";
    },
  },
  created() {
    const {
      $set,
      formatY,
      dates,
      datesInclude,
      value: { dateFrom, dateTo },
    } = this;
    $set(dates, 0, formatY(dateFrom));
    $set(dates, 1, formatY(dateTo));

    if (dateFrom !== undefined) {
      $set(datesInclude, 0, 0);
    }
    if (dateTo !== undefined) {
      $set(datesInclude, 1, 1);
    }
  },
};
</script>
