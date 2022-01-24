<template>
  <v-app>
    <v-app-bar
      class="mb-6"
      app
      color="#6A76AB"
      dark
      height="200"
      :src="require('/src/assets/stadium.jpg')"
      hide-on-scroll
      prominent
      scroll-threshold="0"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(85,139,47,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>
      <v-app-bar-title class="ml-6">Футбол</v-app-bar-title>
      <v-spacer></v-spacer>
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab :to="{ name: 'CompetitionsFrom' }">Соревнования</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
};
</script>
