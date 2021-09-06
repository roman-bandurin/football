<template>
  <v-container fluid>
    <v-row class="d-flex flex-row flex-nowrap justify-start">
      <v-col class="text-center mr-6" style="min-width: 30px">
        <v-emblem :url="url"></v-emblem>
      </v-col>
      <v-col class="text-center mr-6" style="min-width: 30px">
        {{ short }}
      </v-col>
      <v-col class="flex-grow-1 text-truncate" cols="12">
        {{ value }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VEmblem from "./VEmblem.vue";

export default {
  name: "Row",
  components: {
    VEmblem,
  },
  props: {
    url: {
      type: String,
      require: true,
    },
    short: {
      type: String,
      require: true,
    },
    value: {
      type: String,
      require: true,
    },
  },
};
</script>
