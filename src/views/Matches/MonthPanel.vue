<template>
  <v-date-picker
    :value="formatY(value, true)"
    type="month"
    locale="ru"
    :show-current="formatY(new Date(), true)"
    :min="formatY(dateFrom, true)"
    :max="formatY(dateTo, true)"
    full-width
    class="mt-4"
    @change="$emit('change', parseY($event, true))"
  ></v-date-picker>
</template>

<script>
import { lightFormat, parse } from "date-fns";

export default {
  name: "MonthPanel",
  model: {
    prop: "value",
    event: "change",
  },
  props: {
    value: Date,
    dateFrom: Date,
    dateTo: Date,
  },
  data() {
    return {};
  },
  methods: {
    parseY(date, isMonth = false) {
      return date !== undefined
        ? parse(date, isMonth ? "yyyy-MM" : "yyyy-MM-dd", new Date(0, 0, 1))
        : undefined;
    },
    formatY(date, isMonth = false) {
      return date !== undefined
        ? lightFormat(date, isMonth ? "yyyy-MM" : "yyyy-MM-dd")
        : "";
    },
  },
};
</script>
