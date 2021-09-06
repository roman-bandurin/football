<template functional>
  <img
    v-if="props.url"
    :src="props.url"
    class="flag_matchview"
    style="vertical-align: middle; height: 20px"
  />
</template>

<script>
export default {
  name: "VEmblem",
  props: {
    url: {
      type: String,
      require: true,
    },
  },
};
</script>
