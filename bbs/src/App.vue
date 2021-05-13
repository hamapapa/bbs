<template>
  <Header />
  <router-view />
  <Footer />
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  setup() {},
  components: {
    Header,
    Footer,
  },
};
</script>

<style lang="scss">
@import "~@/../mdb/scss/index.free.scss";

#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
}
</style>
