<template>
  <v-select
    :value="value"
    :items="competitions.items"
    item-text="name"
    item-value="id"
    label="Соревнование"
    hint="Выберите соревнование из списка"
    persistent-hint
    prepend-icon="mdi-soccer"
    clearable
    single-line
    @change="$emit('change', $event)"
  >
    <template v-slot:append-outer>
      <v-btn small text :to="escapeRoute">
        <span>Соревнования</span>
        <v-icon right>mdi-arrow-up</v-icon>
      </v-btn>
    </template>
    <template v-slot:item="{ item: { emblemUrl, code, name } }">
      <Row :url="emblemUrl" :short="code" :value="name"></Row>
    </template>
    <template v-slot:selection="{ item: { emblemUrl, code, name } }">
      <v-label absolute color="primary" left="0" right="auto" value
        >Соревнование</v-label
      >
      <Row :url="emblemUrl" :short="code" :value="name"></Row>
    </template>
  </v-select>
</template>

<script>
import { mapState } from "vuex";
import Row from "./Row.vue";

export default {
  name: "CompetitionsFilter",
  components: {
    Row,
  },
  props: {
    value: Number,
    escapeRoute: Object,
  },
  computed: {
    ...mapState("competitions", ["competitions"]),
  },
};
</script>
