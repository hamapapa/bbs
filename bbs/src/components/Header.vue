<template>
  <header>
    <!-- Navbar -->
    <MDBNavbar
      expand="lg"
      dark
      class="text-white"
      bg="togglenav"
      container
      position="sticky"
    >
      <MDBNavbarToggler target="#navbarExample01"></MDBNavbarToggler>
      <MDBNavbarNav collapse="navbarExample01" class="mb-2 mb-lg-0">
        <MDBNavbarItem :to="{ name: 'Home' }"> Home </MDBNavbarItem>
        <MDBNavbarItem v-if="isLogined" :to="{ name: 'User' }">
          User</MDBNavbarItem
        >
        <MDBNavbarItem v-if="isLogined" :to="{ name: 'Thread' }">
          Thread</MDBNavbarItem
        >
        <!-- <router-link v-bind:to="{ name: 'About' }"> About </router-link> -->
      </MDBNavbarNav>

      <a v-if="isLogined" href="#" class="text-white" @click="onClickLogout"
        >ログアウト</a
      >
    </MDBNavbar>

    <!-- Navbar -->
  </header>
</template>

<script>
import store from "../store";
import {
  MDBNavbar,
  MDBNavbarToggler,
  MDBNavbarNav,
  MDBNavbarItem,
} from "mdb-vue-ui-kit";
import { computed } from "@vue/runtime-core";

export default {
  setup() {
    const isLogined = computed(() => {
      return store.state.isLogined;
    });

    const onClickLogout = () => {
      store.commit("logout");
    };
    return {
      isLogined,
      onClickLogout,
    };
  },
  components: {
    MDBNavbar,
    MDBNavbarToggler,
    MDBNavbarNav,
    MDBNavbarItem,
  },
};
</script>