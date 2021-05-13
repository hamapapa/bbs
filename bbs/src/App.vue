<template>
  <Header />
  <div class="bg-orange50 py-4">
    <router-view />
  </div>
</template>

<script>
import Header from "@/components/Header";
export default {
  setup() {},
  components: {
    Header,
  },
};
</script>

<style lang="scss">
@import "~@/../mdb/scss/index.free.scss";

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
