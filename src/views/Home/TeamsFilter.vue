<template>
  <v-select
    :value="value"
    :items="teams.items"
    item-text="name"
    item-value="id"
    label="Команда"
    hint="Выберите команду из списка"
    persistent-hint
    prepend-icon="mdi-account-group"
    clearable
    single-line
    @change="$emit('change', $event)"
  >
    <template v-slot:append-outer>
      <v-btn small text :to="escapeRoute">
        <span>Команды </span>
        <v-icon right>mdi-arrow-up</v-icon>
      </v-btn>
    </template>
    <template v-slot:item="{ item: { crestUrl, tla, name } }">
      <Row :url="crestUrl" :short="tla" :value="name"></Row>
    </template>
    <template v-slot:selection="{ item: { crestUrl, tla, name } }">
      <v-label absolute color="primary" left="0" right="auto" value
        >Команда</v-label
      >
      <Row :url="crestUrl" :short="tla" :value="name"></Row>
    </template>
  </v-select>
</template>

<script>
import { mapState } from "vuex";
import Row from "./Row.vue";

export default {
  name: "TeamsFilter",
  components: {
    Row,
  },
  props: {
    value: Number,
    escapeRoute: Object,
  },
  computed: {
    ...mapState("teams", ["teams"]),
  },
};
</script>
